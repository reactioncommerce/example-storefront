import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { Router } from "routes";

@inject("keycloakAuthStore")
class AuthPage extends Component {
  static propTypes = {
    keycloakAuthStore: PropTypes.object.isRequired,
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
      const { keycloakAuthStore } = this.props;

      keycloakAuthStore.setToken(params.access_token);
      keycloakAuthStore.saveTokenToLocalStorage();

      const previousRoute = localStorage.getItem("kc-redirected-from");
      localStorage.removeItem("kc-redirected-from");
      Router.pushRoute(previousRoute || "/");
    }
  }

  render() {
    this.setToken();
    return <div>Logging in...</div>;
  }
}

export default AuthPage;
