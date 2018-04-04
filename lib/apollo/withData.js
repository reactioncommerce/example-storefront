import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Head from "next/head";
import initApollo from "./initApollo";

function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

export default (ComposedComponent) =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`;
    static propTypes = {
      serverState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx) {
      let serverState = {
        apollo: {
          data: {}
        }
      };

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo();
        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };
        try {
          // Run all GraphQL queries
          await getDataFromTree( // eslint-disable-line
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          ); // eslint-disable-line
        } catch (error) {
          // errorr
          // TODO: handle the error
          console.log("apollo client error", error)
        }
        Head.rewind();
        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        };
      }

      return {
        serverState,
        ...composedInitialProps
      };
    }

    constructor(props) {
      super(props);
      this.apollo = initApollo(this.props.serverState.apollo.data);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
