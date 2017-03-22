import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {toggleCheck, incNumber, decNumber} from "../actions";
import { IntlProvider } from "react-intl";
import ReactNavbarContainer from "../containers/academic-navbar";
import { AboveTheFoldOnlyServerRender } from "above-the-fold-only-server-render";

import ABExperiment from "react-ab-experiment";
import MedicalSearch from "../containers/medical-search";
import AcademicSearch from "../containers/academic-search";

class Home extends React.Component {
  render() {
    const props = this.props;
    const {store} = this.context;
    const {planoutExperiment, user} = store.getState();
    
    /* Lee
          id="58c70e0808e80285323eeb3b"
          id="58c6aacb21500a53407f6a49"
      Steve
          id="58c83e3b4abcb5385472c69f"
          id="58c829664abcb5385472c69e"
    */

    return (
      <IntlProvider locale="en">
        <AboveTheFoldOnlyServerRender skip={true}>
          <div>
          <ABExperiment
            id="58c70e0808e80285323eeb3b"
            name="navbar_color"
            propKey="color"
            description="What color to use for navbar"
            experimentType="property"
            prepend="#"
            provider="planout"
            planoutExperiment={planoutExperiment}
            goals= {["listenToSearchEvent"]}
            user={user}
            planoutUrl="http://0.0.0.0:4000/api/GoalResults"
            >
            <ReactNavbarContainer/>
          </ABExperiment>

            <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
            <div>
              <ABExperiment 
                id="58c6aacb21500a53407f6a49"
                name="search_component"
                description="What search box to use?"
                experimentType="component"
                components={{
                  "MedicalSearch": <MedicalSearch/>,
                  "AcademicSearch": <AcademicSearch/>                  
                }}
                defaultComponent="AcademicSearch"
                provider="planout"
                planoutExperiment={planoutExperiment}
                goals={["listenToSearchEvent","listenToAutoCompleteEvent"]}
                user={user}
                planoutUrl="http://0.0.0.0:4000/api/GoalResults"
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
