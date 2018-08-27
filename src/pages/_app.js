import NextApp, { Container } from "next/app";
import React from "react";
import getConfig from "next/config";
import track from "lib/tracking/track";
import { StripeProvider } from "react-stripe-elements";
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
import { ComponentsProvider } from "@reactioncommerce/components-context";
import componentsContext from "../componentsContext";
import getPageContext from "../lib/theme/getPageContext";

const { publicRuntimeConfig } = getConfig();

@withApolloClient
@withMobX
@withShop
@withViewer
@withTags
@track({}, { dispatch })
export default class App extends NextApp {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
    this.state = { stripe: null };
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

    const { stripePublicApiKey } = publicRuntimeConfig;
    if (stripePublicApiKey) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ stripe: window.Stripe(stripePublicApiKey) });
    }
  }

  render() {
    const { Component, shop, ...rest } = this.props;
    const { route } = this.props.router;

    return (
      <Container>
        <StripeProvider stripe={this.state.stripe}>
          <ComponentsProvider value={componentsContext}>
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
                  (route === "/checkout" || route === "/login") ? (
                    <Component pageContext={this.pageContext} shop={shop} {...rest} />
                  ) : (
                    <Layout shop={shop}>
                      <Component pageContext={this.pageContext} shop={shop} {...rest} />
                    </Layout>
                  )
                }
              </MuiThemeProvider>
            </JssProvider>
          </ComponentsProvider>
        </StripeProvider>
      </Container>
    );
  }
}
