import App, { Container } from "next/app";
import React from "react";
import track from "lib/tracking/track";
import dispatch from "lib/tracking/dispatch";
import Layout from "components/Layout";
import { inject } from "mobx-react";
import withData from "lib/apollo/withData";
import withTheme from "lib/theme/withTheme";
import withShop from "containers/shop/withShop";

@withData
@withTheme
@withShop
@inject("routingStore")
@inject("uiStore")
@track({}, { dispatch })
export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router, shop } = this.props;

    return (
      <Container>
        <Layout>
          <Component {...pageProps} router={router} shop={shop} />
        </Layout>
      </Container>
    );
  }
}
