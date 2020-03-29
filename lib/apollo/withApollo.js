import React from "react";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloProvider as NewApolloProvider } from "@apollo/client";
import createApolloClient from "./apolloClient";

// On the client we store the apollo client in the following variable
// this prevents the client from reinitializing between page transitions.
let globalApolloClient = null;


const initApolloClient = () => {
  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient();
  }

  return globalApolloClient;
};

export const withApollo = () => (PageComponent) => {
  const WithApollo = ({ ...pageProps }) => {
    const client = initApolloClient();

    return (
      <ApolloProvider client={client}>
        <NewApolloProvider client={client}>
          <PageComponent {...pageProps} />
        </NewApolloProvider>
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name || "Component";
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  return WithApollo;
};
