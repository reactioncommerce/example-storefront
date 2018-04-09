import React from "react";
import { Query } from "react-apollo";
import viewerQuery from "./viewer.gql";
import Profile from "./Profile";

export default () => (
  <Query query={viewerQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      const { viewer } = data;
      return (
        <Profile viewer={viewer} />
      );
    }}
  </Query>
);
