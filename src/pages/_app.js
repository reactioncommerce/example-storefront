import NextApp, { Container } from "next/app";
import React from "react";
import track from "lib/tracking/track";
import dispatch from "lib/tracking/dispatch";
import withApolloClient from "lib/apollo/withApolloClient";
import withShop from "containers/shop/withShop";
import withViewer from "containers/account/withViewer";
import withTags from "containers/tags/withTags";
import Layout from "components/Layout";
import withMobX from "lib/stores/withMobX";
import rootMobXStores from "lib/stores";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../lib/theme/getPageContext";

@withApolloClient
@withMobX
@withShop
@withViewer
@withTags
@withTheme
@track({}, { dispatch })
export default class App extends NextApp {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  pageContext = null;

  componentDidMount() {
    // Fetch and update auth token in auth store
    rootMobXStores.authStore.setTokenFromLocalStorage();
    rootMobXStores.cartStore.setAnonymousCartCredentialsFromLocalStorage();
    rootMobXStores.keycloakAuthStore.setTokenFromLocalStorage();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, shop, ...rest } = this.props;
    const { route } = this.props.router;

    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            {
              route === "/checkout" ? (
                <Component pageContext={this.pageContext} shop={shop} {...rest} />
              ) : (
                <Layout shop={shop}>
                  <Component pageContext={this.pageContext} shop={shop} {...rest} />
                </Layout>
              )
            }
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
