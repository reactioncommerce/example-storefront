import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import Helmet from "react-helmet";
import jsHttpCookie from "cookie";
import analyticsProviders from "analytics";
import rootMobxStores from "../lib/stores";
import getPageContext from "../lib/theme/getPageContext";

class HTMLDocument extends Document {
  static getInitialProps = (ctx) => {
    // Get the context of the page to collected side effects.
    const pageContext = getPageContext();
    const { req } = ctx;

    // Grab cookies form the request headers
    if (req && req.headers) {
      const cookies = req.headers.cookie;

      if (typeof cookies === "string") {
        const { token } = jsHttpCookie.parse(cookies);
        rootMobxStores.authStore.token = token;
      }
    }

    /* eslint-disable-next-line react/display-name */
    const page = ctx.renderPage((Component) => (props) => (
      <JssProvider registry={pageContext.sheetsRegistry} generateClassName={pageContext.generateClassName}>
        <Component pageContext={pageContext} {...props} />
      </JssProvider>
    ));

    return {
      ...page,
      pageContext,
      helmet: Helmet.rewind(),
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  };

  render() {
    const { pageContext, helmet } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    let scripts = [];

    // Render analytics  scripts
    scripts = analyticsProviders.map((provider) => ({
      type: "text/javascript",
      innerHTML: provider.renderScript()
    }));

    return (
      <html lang="en" {...htmlAttrs}>
        <Head>
          <Helmet
            htmlAttributes={{ lang: "en", dir: "ltr" }}
            title="My page"
            meta={[
              { charSet: "utf-8" },
              // Use minimum-scale=1 to enable GPU rasterization
              {
                name: "viewport",
                content: "user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
              },
              // PWA primary color
              { name: "theme-color", content: pageContext.theme.palette.primary.main }
            ]}
            link={[{ href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,700" }]}
            script={scripts}
          />
          {helmet.base.toComponent()}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.style.toComponent()}
          {helmet.script.toComponent()}
          {helmet.noscript.toComponent()}
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
