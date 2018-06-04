import App, { Container } from "next/app";
import React from "react";
import track from "lib/tracking/track";
import dispatch from "lib/tracking/dispatch";

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
    const { Component, router, pageProps } = this.props;

    return (
      <Container>
        <Component router={router} {...pageProps} />
      </Container>
    );
  }
}
