import NextApp from "next/app";
import React from "react";
import { ThemeProvider as RuiThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StripeProvider } from "react-stripe-elements";
import { Provider as MobxProvider } from "mobx-react";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import Layout from "components/Layout";
import withMobX from "lib/stores/withMobX";
import withShop from "containers/shop/withShop";
import rootMobXStores from "lib/stores";
import components from "custom/componentsContext";
import componentTheme from "custom/componentTheme";
import theme from "custom/reactionTheme";

class App extends NextApp {
  constructor(props) {
    super(props);
    this.state = { stripe: null };
  }

  componentDidMount() {
    // Fetch and update auth token in auth store
    rootMobXStores.cartStore.setAnonymousCartCredentialsFromLocalStorage();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (process.env.STRIPE_PUBLIC_API_KEY && window.Stripe) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ stripe: window.Stripe(process.env.STRIPE_PUBLIC_API_KEY) });
    }
  }

  render() {
    const { Component, pageProps, viewer, ...rest } = this.props;
    const { tags, shop } = pageProps;
    const { route } = this.props.router;
    const { stripe } = this.state;

    return (
      <ComponentsProvider value={components}>
        <MobxProvider suppressChangedStoreWarning navItems={shop && shop.defaultNavigationTree} tags={tags}>
          <RuiThemeProvider theme={componentTheme}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              {route === "/checkout" || route === "/login" ? (
                <StripeProvider stripe={stripe}>
                  <Component shop={shop} {...rest} {...pageProps} />
                </StripeProvider>
              ) : (
                <Layout shop={shop} viewer={viewer}>
                  <Component shop={shop} {...rest} {...pageProps} />
                </Layout>
              )}
            </MuiThemeProvider>
          </RuiThemeProvider>
        </MobxProvider>
      </ComponentsProvider>
    );
  }
}

// export default withMobX(withShop(withViewer(App)));
export default withMobX(withShop(App));
