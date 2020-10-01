import React, { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import theme from "custom/reactionTheme";
import { AnalyticsProvider } from "use-analytics";
import PropTypes from "prop-types";
import useInitAnalytics from "hooks/analytics/useInitAnalytics";

const App = (props) => {
  const { Component, pageProps, ...rest } = props;
  const analytics = useInitAnalytics();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <AnalyticsProvider instance={analytics}>
      <ContextProviders pageProps={pageProps}>
        <ComponentsProvider value={components}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...rest} {...pageProps} />
          </MuiThemeProvider>
        </ComponentsProvider>
      </ContextProviders>
    </AnalyticsProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default App;
