import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  svg: {
    background: "none"
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    height: "75vh",
    justifyContent: "center"
  }
});

@withStyles(styles, { withTheme: true })
class PageLoading extends Component {
  static propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object
  };

  state = {
    delayIsDone: false
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        delayIsDone: true
      });
    }, 800);
  }

  renderSpinner() {
    const { classes, theme } = this.props;

    return (
      <svg
        className={classes.svg}
        height="150px"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
        width="150px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="36.7846"
          fill={theme.palette.reaction.pageLoading.color}
          r="13"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            values="23;77;23"
            keyTimes="0;0.5;1"
            dur="1.2"
            keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
    );
  }

  render() {
    const { classes } = this.props;
    const { delayIsDone } = this.state;

    return (
      <div className={classes.wrapper}>
        {!!delayIsDone && this.renderSpinner()}
      </div>
    );
  }
}

export default PageLoading;
