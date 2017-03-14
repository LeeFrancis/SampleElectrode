import React, { PropTypes } from "react";
import { ReactNavbar } from "react-ref-navbar";

class ReactNavbarContainer extends React.Component {

  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <ReactNavbar 
          menu = {[
              { key: 0, nav: 'left', label: 'New Search', link: '#' },
              { key: 1, nav: 'left', label: 'Curriculum Standards', link: '#' },
              { key: 2, nav: 'right', label:'Sign In', icon: 'signin-icon', link: '#' },
              { key: 3, nav: 'right', label: 'Help', icon: 'help-icon', link: '#' }
            ]}
        />
    );
  }
}


export default ReactNavbarContainer;
