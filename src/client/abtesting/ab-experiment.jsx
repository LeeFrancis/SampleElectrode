import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {getComponentInstance} from "./components";
import getExperimentInstance from "./experiment";
import optimizely from "optimizely-client-sdk";


const partial = (func) => {
  var args = Array.prototype.slice.call(arguments).splice(1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

class ABExperiment extends React.Component {

  experimentInstance(provider="planout"){
    const inst = {
      "optimizely": ()=>{
        const {store} = this.context;
        const {optimizelyJSON} = store.getState();
        return optimizely.createInstance(
          { datafile: optimizelyJSON }
        );
      },
      "planout": ()=>{
        const {id} = this.props;
        const {store} = this.context;
        const {experiments, user = {}} = store.getState();
        const experiment = (experiments || []).find((exp) => exp.experimentId === id);

        // Random generator to be replaced by id...
        return experiment ?
          getExperimentInstance(experiment.json, user.id || Math.ceil(Math.random()*10)):
          undefined;
      }
    };
    return inst[provider]();
  }

  experimentGet(expInst, name, provider="planout"){
    const inst = {
      "optimizely": (expInst, name)=> {
        const {prepend} = this.props;
        const {store} = this.context;
        const {user = {}} = store.getState();
        const val = expInst.activate(
          name,
          `${user.id || Math.floor(Math.random() * 15)}`  // eslint-disable-line no-magic-numbers
        )
        return `${prepend || ""}${val}`;
      }
      ,
      "planout": (expInst, name) => expInst.get(name)
    };
    return inst[provider](expInst, name);
  }

  componentTest() {
    const {defComponent} = this.props;
    const {name, id, provider = "planout"} = this.props;
    const expInstance = this.experimentInstance(provider);
    const invalidComponent = <div>Invalid Experiment</div>;
    const component = getComponentInstance(
        expInstance?this.experimentGet(expInstance,name,provider):
        defComponent);
    return component ? component : (getComponentInstance(defComponent) || invalidComponent);
  }

  /* Grab all children */
  propertyTest() {
    const {children, propKey, name, id, provider = "planout"} = this.props;
    const expInstance = this.experimentInstance(provider);
    const clonedChildren = [];
    
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

ABExperiment.propTypes = {
};

ABExperiment.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default ABExperiment;
