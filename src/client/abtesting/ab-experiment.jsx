import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {getComponentInstance} from "./components";
import getExperimentInstance from "./experiment";
import optimizely from "optimizely-client-sdk";
import { logGoalsToMongoDB, logGoalsToOptimizely, simpleLogger } from "./loggers";
import { storeUser, receiveExperiment, incNumber } from "../actions";

const partial = (func) => {
  var args = Array.prototype.slice.call(arguments).splice(1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

class ABExperiment extends React.Component {

  constructor(props) {
    super(props);
    this.handleSuccessEvent = this.handleSuccessEvent.bind(this);
  }

  getCurrentUser() {
    const {store} = this.context;
    const {user = {}} = store.getState();

    console.log(typeof receiveExperiment);
    console.log(typeof incNumber);
    console.log(typeof storeUser);

    if(!user.id) {
      user.id = Math.ceil(Math.random() * 10);
      store.dispatch(storeUser(user));
    }

    return user;
  }

  experimentInstance(provider="planout"){
    const inst = {
      "optimizely": ()=>{
        const {store} = this.context;
        const {optimizelyJSON} = store.getState();
        console.log("json: ", optimizelyJSON);
        console.log("json: ", JSON.parse(optimizelyJSON.body));
        return optimizely.createInstance(
          { datafile: JSON.parse(optimizelyJSON.body) }
        );
      },
      "planout": ()=>{
        const {id} = this.props;
        const {store} = this.context;
        const {experiments} = store.getState();
        const user = this.getCurrentUser();
        const experiment = (experiments || []).find((exp) => exp.experimentId === id);

        // Random generator to be replaced by id...
        const inst = experiment ?
          getExperimentInstance(experiment.json, user.id || Math.ceil(Math.random()*10)):
          undefined;

        inst.configureLogger("mongodb");  
        return inst;
      }
    };
    return inst[provider]();
  }
  

  experimentGet(expInst, name, provider="planout"){
    const inst = {
      "optimizely": (expInst, name)=> {
        const {prepend} = this.props;
        const {store} = this.context;
        const user = this.getCurrentUser();

        const val = expInst.activate(
          name,
          `${user.id}`  // eslint-disable-line no-magic-numbers
        )
        return `${prepend || ""}${val}`;
      }
      ,
      "planout": (expInst, name) => expInst.get(name)
    };
    return inst[provider](expInst, name);
  }

  /* for some reason, we are not getting very much data with the log... */
  handleSuccessEvent(theType) {
    const { provider = "planout" } = this.props;
    const expInstance = this.experimentInstance(provider);
    const user = this.getCurrentUser();

    if(provider === "optimizely") {
        expInstance.track("Search_Initiated", `${user.id}`);
    } else {
        expInstance.logEvent(theType, {experimentid: arguments[1]});
    }

    // event type should be a constant
    //should use something other that args collection here
  }

  innerPartial(func) {
    var args = Array.prototype.slice.call(arguments).splice(1);
    return function() {
      var allArguments = args.concat(Array.prototype.slice.call(arguments));
      console.log('inside the function wrapper: ', allArguments);
      return func.apply(this, allArguments);
    }
  }

  componentTest() {
    const {defComponent} = this.props;
    const {name, id, provider = "planout", goals} = this.props;
    const expInstance = this.experimentInstance(provider);

    // super fast, super wrong way
    if(provider === "planout") {
      expInstance.configureLogger((provider === "planout" ? logGoalsToMongoDB : logGoalsToOptimizely));
    }
    const invalidComponent = <div>Invalid Experiment</div>;

    let passprops = {};
    // iterate over goals
    goals.forEach((val) => {
      passprops[val] = this.innerPartial(this.handleSuccessEvent, val, id);
    }); 
    
    const component = getComponentInstance(
        expInstance?this.experimentGet(expInstance,name,provider):
        defComponent, passprops);
       

    return component ? component : (getComponentInstance(defComponent) || invalidComponent);
  }

  /* Grab all children */
  propertyTest() {
    const {children, propKey, name, id, provider = "planout"} = this.props;
    const expInstance = this.experimentInstance(provider);
    const clonedChildren = [];
    
    //expInstance.configureLogger();
    expInstance.configureLogger((provider === "planout" ? logGoalsToMongoDB : logGoalsToOptimizely));

    if (expInstance){
      const arrayChildren = typeof children === "object" ? [children] : children;
      const experimentVal = this.experimentGet(expInstance,name,provider);
      for (let child of arrayChildren) {
        const extendedProp = {};
        extendedProp[propKey] = experimentVal;
        clonedChildren.push(React.cloneElement(
          child, extendedProp
        ));
      }
    }
    return clonedChildren.length === 1 ? clonedChildren[0] : clonedChildren;
  }

  render() {
    const {testType} = this.props;
    const component = testType === "property" ?
      this.propertyTest():
      this.componentTest();
    return (
      <div>
      { component }
      </div>
    );
  }
}

//ABExperiment.propTypes = {
//  storeUser: PropTypes.func
//}

ABExperiment.contextTypes = {
  store: PropTypes.object
}

//const mapStateToProps = (state) => {
//  return {
//    search: state.search
//  }
//}

export default ABExperiment;
