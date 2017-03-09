import React, { PropTypes } from "react";
import { ReactMedSearchbox } from "react-med-searchbox";

class ReactSearchboxContainer extends React.Component {

  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <ReactMedSearchbox />
    );
  }
}


export default ReactSearchboxContainer;
