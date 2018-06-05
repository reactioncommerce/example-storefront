import NextApp, { Container } from "next/app";
import React from "react";
import track from "lib/tracking/track";
import dispatch from "lib/tracking/dispatch";
import withApolloClient from "lib/apollo/withApolloClient";
import withTheme from "lib/theme/withTheme";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import withMobx from "lib/stores/withMobx";

@withApolloClient
@withShop
@withMobx
@withTheme
@track({}, { dispatch })
export default class App extends NextApp {
  render() {
    const { Component, ...rest } = this.props;

    return (
      <Container>
        <Layout>
          <Component {...rest} />
        </Layout>
      </Container>
    );
  }
}
