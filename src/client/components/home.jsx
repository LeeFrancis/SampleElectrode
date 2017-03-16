import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {toggleCheck, incNumber, decNumber} from "../actions";
import ABExperiment from "../abtesting/ab-experiment";
import { IntlProvider } from "react-intl";
import ReactNavbarContainer from "../containers/academic-navbar";
import { AboveTheFoldOnlyServerRender } from "above-the-fold-only-server-render";

class Home extends React.Component {
  render() {
    const props = this.props;
    const {store} = this.context;
    
    return (
      <IntlProvider locale="en">
        <AboveTheFoldOnlyServerRender skip={true}>
          <div>
          <ABExperiment
            id="58c70e0808e80285323eeb3b"
            name="navbar_color"
            propKey="color"
            description="What color to use for navbar"
            testType="property"
            prepend="#"
            provider="optimizely"
            
            >
            <ReactNavbarContainer/>
          </ABExperiment>

            <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
            <div>
              <ABExperiment 
                id="58c6aacb21500a53407f6a49"
                name="search_component"
                description="What search box to use?"
                testType="component"
                defComponent="AcademicSearch"
                provider="optimizely"
              />
            </div>
          </div>
        </AboveTheFoldOnlyServerRender>
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
