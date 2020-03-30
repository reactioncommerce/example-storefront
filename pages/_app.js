import NextApp from "next/app";
import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import theme from "custom/reactionTheme";

export default class App extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, ...rest } = this.props;

    return (
      <ContextProviders pageProps={pageProps}>
        <ComponentsProvider value={components}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...rest} {...pageProps} />
          </MuiThemeProvider>
        </ComponentsProvider>
      </ContextProviders>
    );
  }
}
