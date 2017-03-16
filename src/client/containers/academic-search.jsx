import React, { PropTypes } from "react";
import { ReactSearchbox } from "react-ref-searchbox";

class ReactSearchboxContainer extends React.Component {

  constructor({ props }) {
    super(props);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  /* These are hooks for anyone wanting to listen for important events */
  handleSearchSubmitListener(e) {
    if(this.props.listenToSearchEvent && typeof this.props.listenToSearchEvent === "function") {
      this.props.listenToSearchEvent(e);
    }
  }
  handleAutocompleteSubmitListener(e) {
    if(this.props.listenToAutoCompleteEvent && typeof this.props.listenToAutoCompleteEvent === "function") {
      this.props.listenToAutoCompleteEvent(e);
    }
  }

  handleSearchSubmit (e) {
    const { store } = this.context;
    this.handleSearchSubmitListener(e);
    store.dispatch(doSearch(Math.random()));
  }

  render() {
    return (
      <ReactSearchbox 
        inputProps = {{
            placeholder: 'Enter any words to find books, journals and more',
            value: 'app',
            onChange: () => {}
          }}
        autocompleteAfter = {2}
        renderSuggestion = {(suggestion) => 
          <span>{suggestion.suggestion}</span>
        }
        suggestions = {[{
          "id": "1",
          "suggestion": "applied sciences scientific knowledge models & theories"
        }, {
          "id": "2",
          "suggestion": "physical sciences chemistry atoms elements & molecules"
        }, {
          "id": "3",
          "suggestion": "life sciences biochemistry & molecular biology"
        }, {
          "id": "4",
          "suggestion": "physical sciences forces motion"
        }, {
          "id": "5",
          "suggestion": "green movement"
        }, {
          "id": "6",
          "suggestion": "mobile communication systems"
        }, {
          "id": "7",
          "suggestion": "motion pictures"
        }, {
          "id": "8",
          "suggestion": "mathematical models"
        }, {
          "id": "9",
          "suggestion": "simulation methods & models"
        }, {
          "id": "10",
          "suggestion": "mountaineering"
        }]}
      />
    );
  }
}

ReactSearchboxContainer.PropTypes = {
  listenToSearchEvent: PropTypes.func,
  listenToAutoCompleteEvent: PropTypes.func
}

export default ReactSearchboxContainer;
