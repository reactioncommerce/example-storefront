import React from "react";
import { Query } from "react-apollo";
import navigationTagsQuery from "./navigationTags.gql";

export default (Component) => {
  return (props) => (
    <Query query={navigationTagsQuery} variables={{ shopId: props.shopId }}>
      {({ loading, error, data }) => {
        console.log("error", error, data);

        if (loading || error) return null;

        const { tags: { edges } } = data;
        const topLevelTags = Array.isArray(edges) && edges.filter(({ node }) => node.isTopLevel)

        return (
          <Component {...props} navItems={{ edges: topLevelTags }} />
        );
      }}
    </Query>
  )
};
