import React, { Component } from "react";

class PageLoading extends Component {
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
    return (
      <svg
        className="lds-ball"
        height="150px"
        preserveAspectRatio="xMidYMid"
        style={{ background: "none" }}
        viewBox="0 0 100 100"
        width="150px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="36.7846"
          fill="#58A8DB"
          ng-attr-cy="{{config.cy}}"
          ng-attr-fill="{{config.color}}"
          ng-attr-r="{{config.radius}}"
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
    const { delayIsDone } = this.state;

    return (
      <div style={{ height: "75vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        {!!delayIsDone && this.renderSpinner()}
      </div>
    );
  }
}

export default PageLoading;
