import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {getComponentInstance} from "./components";
import getExperimentInstance from "./experiment";

class ABExperiment extends React.Component {
  getExperimentInstance(id) {
    const {store} = this.context;
    const {experiments} = store.getState();
    const experiment = (experiments || []).find((exp) => exp.experimentId === id) || {};
    // Random generator to be replaced by id...
    return experiment ?
      getExperimentInstance(experiment.json, Math.ceil(Math.random()*10)):
      undefined;
  }
  componentTest() {
    const {name, id} = this.props;
    const expInstance = this.getExperimentInstance(id);
    let component = <div>Invalid Experiment</div>;
    if (expInstance) {
      component = getComponentInstance(expInstance.get(name));
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

export default ABExperiment;
