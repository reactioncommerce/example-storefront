import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import Helmet from "react-helmet";
import { ServerStyleSheet } from "styled-components";
import getConfig from "next/config";
import analyticsProviders from "../custom/analytics";
import favicons from "../custom/favicons";

const { publicRuntimeConfig } = getConfig();

/**
 * For details about the styled-components SSR code in this file, see https://www.styled-components.com/docs/advanced#nextjs
 * _document is only rendered on the server side and not on the client side.
 * Event handlers like onClick can't be added to this file.
 */
class HTMLDocument extends Document {
  static getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    let pageContext;

    const sheet = new ServerStyleSheet();

    const page = ctx.renderPage((App) => {
      const WrappedComponent = (props) => {
        // eslint-disable-next-line prefer-destructuring
        pageContext = props.pageContext;

        return sheet.collectStyles(<App {...props} />);
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      };

      return WrappedComponent;
    });

    const styledComponentsStyleTags = sheet.getStyleElement();

    return {
      ...page,
      pageContext,
      helmet: Helmet.rewind(),
      styles: (
        <Fragment>
          <style
            id="jss-server-side"
            // pageContext is undefined when there was an Apollo network error. Avoid extra errors
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: pageContext ? pageContext.sheetsRegistry.toString() : "" }}
          />
          {flush() || null}
        </Fragment>
      ),
      styledComponentsStyleTags
    };
  }

  render() {
    const { helmet, pageContext, styledComponentsStyleTags } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const links = [
      { rel: "canonical", href: publicRuntimeConfig.canonicalUrl },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" },
      ...favicons
    ];
    const meta = [
      // Use minimum-scale=1 to enable GPU rasterization
      {
        name: "viewport",
        content: "user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
      }
    ];

    // PWA primary color
    // pageContext is undefined when there was an Apollo network error. Avoid extra errors
    if (pageContext) {
      meta.push({ name: "theme-color", content: pageContext.theme.palette.primary.main });
    }

    // Analytics & Stripe Elements scripts
    const scripts = [
      ...analyticsProviders.map((provider) => ({
        type: "text/javascript",
        innerHTML: provider.renderScript()
      })),
      {
        type: "text/javascript",
        src: "https://js.stripe.com/v3/"
      }
    ];

    return <html lang="en" {...htmlAttrs}>
      <Head>
        <Helmet htmlAttributes={{ lang: "en", dir: "ltr" }} />
        {meta.map((tag, index) => <meta key={index} {...tag} />)}
        {links.map((link, index) => <link key={index} {...link} />)}
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
        {styledComponentsStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
        {scripts.map((script, index) => (script.innerHTML ? /* eslint-disable-next-line */
          <script async key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.innerHTML }} /> : <script async key={index} {...script} />))}
      </body>
    </html>;
  }
}

export default HTMLDocument;
