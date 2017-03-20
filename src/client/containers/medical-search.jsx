import React, { PropTypes } from "react";
import { ReactMedSearchbox } from "react-med-searchbox";
import { doSearch } from "../actions/index";
import { connect } from "react-redux";

function noop (){};

class ReactSearchboxContainer extends React.Component {

  constructor({ props }) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  /* These are hooks for anyone wanting to listen for important events */
  handleSearchSubmitListener(e) {
    if(this.props.listenToSearchEvent && typeof this.props.listenToSearchEvent === "function") {
      this.props.listenToSearchEvent();
    }
  }
  handleAutocompleteSubmitListener(e) {
    if(this.props.listenToAutoCompleteEvent && typeof this.props.listenToAutoCompleteEvent === "function") {
      this.props.listenToAutoCompleteEvent();
    }
  }

  getLoggableEvents() {
    return [
      "listenToSearchEvent",
      "listenToAutoCompleteEvent"
    ];
  }

  handleSearchSubmit (e) {
    const { store } = this.context;

    this.handleSearchSubmitListener(e);

    store.dispatch(doSearch(Math.random()));
  }

  render() {
    return (
      <ReactMedSearchbox 
        handleSearchSubmit = { this.handleSearchSubmit }
      />
    );
  }
}

ReactSearchboxContainer.contextTypes = {
  store: PropTypes.object
};

ReactSearchboxContainer.PropTypes = {
  listenToSearchEvent: PropTypes.func,
  listenToAutoCompleteEvent: PropTypes.func
}

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps)(ReactSearchboxContainer);
