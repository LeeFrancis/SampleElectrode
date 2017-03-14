import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {getComponentInstance} from "./components";
import getExperimentInstance from "./experiment";

class ABExperiment extends React.Component {

  render() {
    const {id, name} = this.props;
    const {store} = this.context;
    const {experiments} = store.getState();
    const experiment = (experiments || []).find((exp) => exp.experimentId === id) || {};
    let component = <div>Invalid Experiment</div>;
    if (experiment) {
      const expInstance = getExperimentInstance(experiment.json, Math.ceil(Math.random()*10));
      // Random generator to be replaced by id...
      component = getComponentInstance(expInstance.get(name));
    }
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
