import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router } from "routes";

class AuthPage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired
  }

  getUrlParams() {
    const hashObj = this.props.router.asPath
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

  setToken() {
    // parse the url params from Keycloak
    const params = this.getUrlParams();

    if (typeof window !== "undefined" && params.access_token) {
      localStorage.setItem("kc-token", params.access_token);
      Router.pushRoute("/");
    }
  }

  render() {
    this.setToken();
    return <div>Logging in...</div>;
  }
}

export default AuthPage;
