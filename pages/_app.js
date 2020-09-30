import React, { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import theme from "custom/reactionTheme";
import { useRouter } from "next/router";
import analytics from "lib/analytics";
import { AnalyticsProvider } from "use-analytics";
import PropTypes from "prop-types";
import { decodeOpaqueId } from "lib/utils/decoding";

const App = (props) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const handleRouteChange = (url) => {
      if (previewUrl === url) return true;
      setPreviewUrl(url);
      const { isFallback, query } = router;
      const { shop } = props.pageProps;
      const shopDecoded = shop?._id && decodeOpaqueId(shop._id);

      return analytics.page({
        isFallback,
        path: url,
        query,
        shopId: shopDecoded?.id
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const { Component, pageProps, ...rest } = props;

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
  pageProps: PropTypes.object,
  router: PropTypes.object
};

export default App;
