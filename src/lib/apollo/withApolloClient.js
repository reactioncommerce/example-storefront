import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import Head from "next/head";
import getConfig from "next/config";
import rootMobxStores from "lib/stores";
import logger from "../logger";
import initApollo from "./initApollo";

const STATUS_FOUND = 302;
const STATUS_UNAUTHORIZED = 401;

const { serverRuntimeConfig } = getConfig();

/**
 * Get the display name of a component
 * @name getComponentDisplayName
 * @param {React.Component} Component React component
 * @returns {String} Component display name
 */
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || "Unknown";
}

/**
 * @name withApolloClient
 * @summary Wraps the component with a configured Apollo client provider
 * @param {React.Component} WrappedComponent Component to wrap
 * @returns {React.Component} Higher order component
 */
export default function withApolloClient(WrappedComponent) {
  class WithApolloClient extends React.Component {
    static async getInitialProps(ctx) {
      const { Component, router, ctx: { req, res, query, pathname } } = ctx;
      const requestPath = req && req.get("request-path");

      // Provide the `url` prop data in case a GraphQL query uses it
      rootMobxStores.routingStore.updateRoute({ query, pathname, route: router.route });

      // If getInitialProps was called without a request object,
      // then this was most likely a due to a `pushState` rather than a full page request.
      const hasRequestObject = !!req;

      let user;
      try {
        const userString = req && req.session && req.session.passport && req.session.passport.user;
        user = userString && JSON.parse(userString);
      } catch (error) {
        logger.error(`Error parsing user object. Check passport session configuration. ${error}`);
      }

      const apollo = initApollo({ cookies: req && req.cookies }, { accessToken: user && user.accessToken });

      ctx.ctx.apolloClient = apollo;

      let wrappedComponentProps = {};
      if (WrappedComponent.getInitialProps) {
        wrappedComponentProps = await WrappedComponent.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      const apolloState = {};

      if (!process.browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          // eslint-disable-next-line
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <WrappedComponent {...wrappedComponentProps} Component={Component} router={router} />
            </ApolloProvider>
          ); // eslint-disable-line
        } catch (error) {
          const { networkError } = error;
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          if (networkError) {
            // In server, if a 401 Unauthorized error occurred, redirect to /signin.
            // This will re-authenticate without showing a login page and a new token is issued.
            if (networkError.response && networkError.response.status === STATUS_UNAUTHORIZED && res) {
              logger.warn("Received 401 error from the GraphQL API due to invalid or expired authentication credentials. " +
                "Triggering token refresh via redirect flow");
              res.writeHead(STATUS_FOUND, { Location: "/signin" });
              res.end();
              return {};
            }
            logger.error(`Unable to access the GraphQL API. Is it running and accessible at ${serverRuntimeConfig.graphqlUrl} from the Storefront UI server?`);
          } else {
            logger.error(`Error while running getDataFromTree: ${error}`);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the Apollo's store
        apolloState.data = apollo.cache.extract();
      } else {
        apolloState.data = {};
      }

      return {
        ...wrappedComponentProps,
        apolloState,
        accessToken: user && user.accessToken,
        requestPath,
        hasRequestObject
      };
    }

    static displayName = `WithApolloClient(${getComponentDisplayName(WrappedComponent)})`;

    static propTypes = {
      accessToken: PropTypes.string,
      apolloState: PropTypes.object.isRequired,
      router: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps) {
      const { pathname, query, route } = nextProps.router;
      const { requestPath, hasRequestObject } = nextProps;

      // Update routing store with pathname and query after route change
      rootMobxStores.routingStore.updateRoute({ pathname, query, route });

      // Set the rewrite path if this was a full page request
      if (hasRequestObject) {
        rootMobxStores.routingStore.setRewriteRoute(requestPath, route);
      }

      return null;
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, then the client is passed off as a property.
      // After that, rendering is done using Next's normal rendering pipeline
      this.apollo = initApollo(props.apolloState.data, { accessToken: props.accessToken });

      // State must be initialized if getDerivedStateFromProps is used
      this.state = {};
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }

  // Exclude copying `getInitialProps` because WithApolloClient has its own
  hoistNonReactStatic(WithApolloClient, WrappedComponent, { getInitialProps: true });

  return WithApolloClient;
}
