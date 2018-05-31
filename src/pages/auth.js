import React, { Component } from "react";
import PropTypes from "prop-types";

class AuthPage extends Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  }

  state = {
    isAuthenticating: true
  }

  getUrlParams() {
    const hashObj = this.props.url.asPath
      .substring(6)
      .split("&")
      .map((el) => el.split("="))
      .reduce((pre, cur) => {
        // eslint-disable-next-line prefer-destructuring
        pre[cur[0]] = cur[1];
        return pre;
      }, {});

    return hashObj;
  }

  render() {
    return (
      <div>
        <h4>Successful OAuth response:</h4>
        <pre>
          {JSON.stringify(this.getUrlParams(), null, 2)}
        </pre>
      </div>
    );
  }
}

export default AuthPage;
