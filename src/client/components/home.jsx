import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {toggleCheck, incNumber, decNumber} from "../actions";
// import SplitPoint from "../abtesting/split-point";
import { IntlProvider } from "react-intl";
import {ABTest, When, Default} from "react-experiments";

class Home extends React.Component {
  render() {
    const props = this.props;
    const {store} = this.context;
    const {experiments} = store.getState();
    return (
      <IntlProvider locale="en">
        <div>
          {/**/}
          <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
          <div>

            <ABTest experiment={experiments.experiment} on='search_component'>
              <When value='react-ref-searchbox'>
                <strong>Reference</strong>
              </When>
              <When value='react-ref-searchbox'>
                <strong>Medical</strong>
              </When>
              <Default>
                <strong>UMM?>></strong>
              </Default>
            </ABTest>


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
