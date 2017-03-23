import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {toggleCheck, incNumber, decNumber, storeUser} from "../actions";
import { IntlProvider } from "react-intl";
import ReactNavbarContainer from "../containers/academic-navbar";
import { AboveTheFoldOnlyServerRender } from "above-the-fold-only-server-render";

import ABExperiment from "react-ab-experiment";
import MedicalSearch from "../containers/medical-search";
import AcademicSearch from "../containers/academic-search";

class Home extends React.Component {
  
  /* fake a user */
  getCurrentUser() {
      const {store} = this.context;
      const {user = {}} = store.getState();

      if(!user.id) {
        user.id = `user_${Math.ceil(Math.random() * 10)}`;
        store.dispatch(storeUser(user));
      }

      return user;
    }
  
  getHandlerConversionMap() {
    const map = new Map();

    map.set("listenToSearchEvent", "Search_Initiated");
    map.set("listenToAutoCompleteEvent","Autocomplete_Selected");

    return map;
  }

  render() {
    const props = this.props;
    const {store} = this.context;
    const {optimizelyExperiment } = store.getState();
    const user = this.getCurrentUser();
    const map = this.getHandlerConversionMap();
     

    /* Lee
          id="58c70e0808e80285323eeb3b"
          id="58c6aacb21500a53407f6a49"
      Steve
          id="58c83e3b4abcb5385472c69f"
          id="58c829664abcb5385472c69e"
    */

    return (
      <IntlProvider locale="en">
        <AboveTheFoldOnlyServerRender skip>
          <div>
          <ABExperiment
            name="navbar_color"
            propKey="color"
            description="What color to use for navbar"
            experimentType="property"
            prepend="#"
            provider="optimizely"
            optimizelyExperiment={optimizelyExperiment}
            goals= { map }
            user={user}
          >
            <ReactNavbarContainer/>
          </ABExperiment>

            <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
            <div>
              <ABExperiment
                name="ABTestDemo"
                description="What search box to use?"
                experimentType="component"
                components={{
                  "MedicalSearch": <MedicalSearch/>,
                  "AcademicSearch": <AcademicSearch/>
                }}
                defaultComponent="AcademicSearch"
                provider="optimizely"
                optimizelyExperiment={optimizelyExperiment}
                goals={ map }
                user={user}
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
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
