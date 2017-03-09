import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {toggleCheck, incNumber, decNumber} from "../actions";
// import SplitPoint from "../abtesting/split-point";
import { IntlProvider } from "react-intl";
import getExperimentInstance from "../abtesting/experiment";
import {ABTest, When, Default} from "react-experiments";

class Home extends React.Component {
  render() {
    const props = this.props;
    const {store} = this.context;
    const {experiments} = store.getState();
    const exp = getExperimentInstance(experiments.experiment, Math.ceil(Math.random()*10));
    const output = exp.get("search_component") || "Not Defined";
    
    return (
      <IntlProvider locale="en">
        <div>
          {/**/}
          <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
          <div>
                <strong>{output}</strong>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

Home.propTypes = {
};

Home.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
