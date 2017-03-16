import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {getComponentInstance} from "./components";
import getExperimentInstance from "./experiment";


const partial = (func) => {
  var args = Array.prototype.slice.call(arguments).splice(1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

class ABExperiment extends React.Component {
  
  constructor() {
    super();
    this.handleSuccessEvent = this.handleSuccessEvent.bind(this);
  }
  
  getExperimentInstance(id) {
    const {store} = this.context;
    const {experiments} = store.getState();
    const experiment = (experiments || []).find((exp) => exp.experimentId === id) || {};
    // Random generator to be replaced by id...
    return experiment ?
      getExperimentInstance(experiment.json, Math.ceil(Math.random()*10)):
      undefined;
  }

  /* for some reason, we are not getting very much data with the log... */
  handleSuccessEvent(theType) {
    const expInstance = this.getExperimentInstance(this.props.id);
    console.log("success event");
    // event type should be a constant
    expInstance.logEvent(theType, {experimentid: arguments[1]});
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(next) {
    console.log("got some props: ", next);
    
  }

  innerPartial(func) {
  var args = Array.prototype.slice.call(arguments).splice(1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    console.log('inside the function wrapper: ', allArguments);
    return func.apply(this, allArguments);
  };
}

  componentTest() {
    const {name, id, goals} = this.props;
    const expInstance = this.getExperimentInstance(id);
    let component = <div>Invalid Experiment</div>;
    let passprops = {};

    // iterate over goals
    goals.forEach((val) => {
      passprops[val] = this.innerPartial(this.handleSuccessEvent, val, id);
      //passprops[val] = this.handleSuccessEvent("search event w/o details so far");
      console.log(val)
    });

    if (expInstance) {
      component = getComponentInstance(expInstance.get(name), passprops);
    }

    return component;
  }

  /* Grab all children */
  propertyTest() {
    const {children, propKey, name, id} = this.props;
    const expInstance = this.getExperimentInstance(id);
    const arrayChildren = typeof children === "object" ? [children] : children;
    const clonedChildren = [];
    
    const experimentVal = expInstance.get(name);
    console.log("color is :",experimentVal);
    for (let child of arrayChildren) {
      const extendedProp = {};
      extendedProp[propKey] = experimentVal;
      clonedChildren.push(React.cloneElement(
        child, extendedProp
      ));
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
