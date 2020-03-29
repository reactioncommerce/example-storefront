import NextApp from "next/app";
import React from "react";
import { ThemeProvider as RuiThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { RoutingProvider } from "context/RoutingContext";
import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import { ShopProvider } from "context/ShopContext";
import { TagsProvider } from "context/TagsContext";
import { UIProvider } from "context/UIContext";
import { LocaleProvider } from "context/LocaleContext";
import components from "custom/componentsContext";
import componentTheme from "custom/componentTheme";
import theme from "custom/reactionTheme";

class App extends NextApp {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, ...rest } = this.props;
    const { tags, shop, lang, translations, namespaces } = pageProps;

    return (
      <RoutingProvider>
        <UIProvider>
          <AuthProvider>
            <CartProvider>
              <LocaleProvider
                lang={lang}
                translations={translations}
                namespaces={namespaces}
              >
                <ShopProvider shop={shop}>
                  <TagsProvider tags={tags}>
                    <ComponentsProvider value={components}>
                      <RuiThemeProvider theme={componentTheme}>
                        <MuiThemeProvider theme={theme}>
                          <CssBaseline />
                          <Component shop={shop} {...rest} {...pageProps} />
                        </MuiThemeProvider>
                      </RuiThemeProvider>
                    </ComponentsProvider>
                  </TagsProvider>
                </ShopProvider>
              </LocaleProvider>
            </CartProvider>
          </AuthProvider>
        </UIProvider>
      </RoutingProvider>
    );
  }
}

export default App;
