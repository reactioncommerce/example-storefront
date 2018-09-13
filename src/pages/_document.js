import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import Helmet from "react-helmet";
import { Provider } from "mobx-react";
import analyticsProviders from "analytics";
import getConfig from "next/config";
import rootMobxStores from "../lib/stores";
import favicons from "../lib/utils/favicons";
import globalStyles from "../lib/theme/globalStyles";

class HTMLDocument extends Document {
  static getInitialProps = (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    let pageContext;
    const page = ctx.renderPage((Component) => {
      const WrappedComponent = (props) => {
        // eslint-disable-next-line prefer-destructuring
        pageContext = props.pageContext;

        return (
          <Provider {...rootMobxStores}>
            <Component pageContext={pageContext} {...props} />
          </Provider>
        );
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      };

      return WrappedComponent;
    });

    return {
      ...page,
      pageContext,
      helmet: Helmet.rewind(),
      styles: (
        <Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          {flush() || null}
        </Fragment>
      )
    };
  };

  render() {
    const { pageContext, helmet } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const { publicRuntimeConfig } = getConfig();
    const { keycloakConfig } = publicRuntimeConfig;
    const links = [
      { rel: "canonical", href: process.env.CANONICAL_URL },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,700" },
      ...favicons
    ];
    const meta = [
      // Use minimum-scale=1 to enable GPU rasterization
      {
        name: "viewport",
        content: "user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
      },
      // PWA primary color
      { name: "theme-color", content: pageContext.theme.palette.primary.main }
    ];

    const scripts = [
      // Render analytics  scripts
      ...analyticsProviders.map((provider) => ({
        type: "text/javascript",
        innerHTML: provider.renderScript()
      })),
      {
        type: "text/javascript",
        src: `${keycloakConfig.url}/js/keycloak.js`
      },
      {
        type: "text/javascript",
        src: "https://js.stripe.com/v3/"
      }
    ];
    return (
      <html lang="en" {...htmlAttrs}>
        <Head>
          <Helmet htmlAttributes={{ lang: "en", dir: "ltr" }} />
          {meta.map((tag) => <meta {...tag} />)}
          {links.map((link) => <link {...link} />)}
          {scripts.map((script) =>
            (script.innerHTML ? (
            /* eslint-disable-next-line */
              <script type={script.type} dangerouslySetInnerHTML={{ __html: script.innerHTML }} />
            ) : (
              <script {...script} />
            )))}
          {helmet.base.toComponent()}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.style.toComponent()}
          {helmet.script.toComponent()}
          {helmet.noscript.toComponent()}
          {globalStyles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default HTMLDocument;
