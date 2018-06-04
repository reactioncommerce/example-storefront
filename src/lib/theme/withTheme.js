import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import rootMobxStores from "../stores";
import getPageContext from "./getPageContext";

/**
 *
 * @param {object} Component to wrap
 * @summary Wraps a page to provide the application's theme
 *
 * @returns {undefined} undefined
 */
function withTheme(Component) {
  class WithTheme extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }

      // Fetch and update auth token in auth store
      rootMobxStores.authStore.setTokenFromCookie();
    }

    pageContext = null;

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithTheme.propTypes = {
    pageContext: PropTypes.object
  };

  WithTheme.getInitialProps = (ctx) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithTheme;
}

export default withTheme;
