import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { widgetDict, getWidgetFromPlanout } from "./widget-dict";

class SplitPoint extends React.Component {
  constructor(props) {
    super(props);
    this.loadWidget(props.fetchWidget);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fetchWidget !== nextProps.fetchWidget) {
      this.loadWidget(nextProps.fetchWidget);
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  loadWidget(fetchWidget) {
    this.safeSetState({
      loaded: false,
      Widget: null
    });
    fetchWidget((file) => {
      this.safeSetState({
        loaded: true,
        Widget: file.__esModule ? file.default : file
      });
    });
  }
  safeSetState(state) {
    if (this.mounted) {
      this.setState(state);
    } else {
      this.state = state;
    }
  }
  render() {
    const { loaded, Widget } = this.state;
    const { widgetProps } = this.props;
    return !loaded ? (<span>Loading..</span>) : (<Widget {...widgetProps} />);
  }
}

SplitPoint.contextTypes = {
  store: PropTypes.object
}

SplitPoint.propTypes = {
  fetchWidget: React.PropTypes.func,
  widgetProps: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const {experiments} = state;
  
	//const { area } = ownProps;
  const area = "Central Banner";
  const areaConfig = {
    widget: getWidgetFromPlanout(experiments),
    props: {}
  };
  const fetchWidget = widgetDict[area][areaConfig.widget] || (() => {});
  return {
    fetchWidget,
    widgetProps: areaConfig.props
  };
};


export default connect(mapStateToProps)(SplitPoint);
