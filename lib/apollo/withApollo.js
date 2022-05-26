import React from "react";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloProvider as NewApolloProvider } from "@apollo/client";
import client from "./apolloClient";

export const withApollo = () => (PageComponent) => {
  const WithApollo = ({ ...pageProps }) => {
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
