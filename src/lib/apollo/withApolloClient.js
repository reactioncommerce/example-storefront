import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Head from "next/head";
import jsHttpCookie from "cookie";
import rootMobxStores from "lib/stores";
import initApolloServer from "./initApolloServer";
import initApolloBrowser from "./initApolloBrowser";

/**
 * Get the display name of a component
 * @name getComponentDisplayName
 * @param {React.Component} Component React component
 * @returns {String} Component display name
 */
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

export default (App) =>
  class WithApolloClient extends React.Component {
    static displayName = `WithApolloClient(${getComponentDisplayName(App)})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
      router: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps) {
      const { pathname, query } = nextProps.router;

      // Update routing store with pathname and query after route change
      rootMobxStores.routingStore.updateRoute({ pathname, query });

      return null;
    }


    static async getInitialProps(ctx) {
      let apolloState = {};

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const { Component, router, req } = ctx;
        let token;

        // Grab cookies form the request headers
        if (req && req.headers) {
          const cookies = req.headers.cookie;

          if (typeof cookies === "string") {
            ({ token } = jsHttpCookie.parse(cookies));
          }

          if (typeof token !== "string" || token.length === 0) token = undefined;
        }

        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };

        rootMobxStores.routingStore.updateRoute(url);

        const apollo = initApolloServer(undefined, { token });
        try {
          // Run all GraphQL queries
          await getDataFromTree( // eslint-disable-line
            <ApolloProvider client={apollo}>
              <App
                {...appProps}
                Component={Component}
                router={router}
              />
            </ApolloProvider>
          ); // eslint-disable-line
        } catch (error) {
          // TODO: handle the error
          console.log("apollo client error", error); // eslint-disable-line
        }
        Head.rewind();
        apolloState = {
          token,
          apollo: {
            data: apollo.cache.extract()
          }
        };
      }

      return {
        ...appProps,
        apolloState
      };
    }

    static getDerivedStateFromProps(nextProps) {
      rootMobxStores.routingStore.updateRoute(nextProps.router);

      return null;
    }

    constructor(props) {
      super(props);
      const { apollo, token } = this.props.apolloState;

      // State must be initialized if getDerivedStateFromProps is used
      this.state = {};

      this.apollo = initApolloBrowser(apollo.data, { token });
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <App {...this.props} />
        </ApolloProvider>
      );
    }
  };
