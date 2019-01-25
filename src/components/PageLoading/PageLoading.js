import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  svg: {
    background: "none"
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    height: "75vh",
    justifyContent: "center",
    flexDirection: "column"
  },
  message: {
    marginTop: "20px"
  }
});

@withStyles(styles, { withTheme: true })
class PageLoading extends Component {
  static propTypes = {
    classes: PropTypes.object,
    delay: PropTypes.number,
    message: PropTypes.string,
    theme: PropTypes.object
  };

  static defaultProps = {
    delay: 800,
    message: null
  }

  state = {
    delayIsDone: false
  }

  componentDidMount() {
    const { delay } = this.props;

    this.timeout = setTimeout(() => {
      this.setState({
        delayIsDone: true
      });
    }, delay);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  renderSpinner() {
    const { classes, theme } = this.props;

    return (
      <svg
        className={classes.svg}
        height={200}
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
        width={200}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="30"
          strokeDasharray="47.12388980384689 47.12388980384689"
          strokeLinecap="round"
          strokeWidth="2"
          stroke={theme.palette.reaction.pageLoading.outerColor}
          transform="rotate(37.5323 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="27"
          strokeDasharray="42.411500823462205 42.411500823462205"
          strokeDashoffset="42.411500823462205"
          strokeLinecap="round"
          strokeWidth="2"
          stroke={theme.palette.reaction.pageLoading.innerColor}
          transform="rotate(-37.5323 50 50)"
        >
          <animateTransform
            attributeName="transform"
            begin="0s"
            calcMode="linear"
            dur="1.1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;-360 50 50"
          />
        </circle>
      </svg>
    );
  }

  renderMessage = () => {
    const { classes, message } = this.props;

    if (!message) {
      return null;
    }

    return (
      <Typography variant="body1" className={classes.message}>{message}</Typography>
    );
  }

  render() {
    const { classes } = this.props;
    const { delayIsDone } = this.state;

    return (
      <div className={classes.wrapper}>
        {!!delayIsDone && this.renderSpinner()}
        {!!delayIsDone && this.renderMessage()}
      </div>
    );
  }
}

export default PageLoading;
