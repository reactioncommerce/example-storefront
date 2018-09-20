import React from "react";
import PropTypes from "prop-types";
import { inject, Provider } from "mobx-react";
import { Query } from "react-apollo";
import hoistNonReactStatic from "hoist-non-react-statics";
import tagsQuery from "./tags.gql";

/**
 * withTag higher order query component for fetching tag information
 * @name WithTag
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `tag` prop
 */
export default function withTag(Component) {
  @inject("primaryShopId")
  class WithTag extends React.Component {
    static propTypes = {
      /**
       * ShopId used to obtain tags for
       */
      primaryShopId: PropTypes.string.isRequired
    }

    /**
     * Generates a tree from the given array of subTagIds.
     * @param {Function} fetchMore - Function used to fetch more data from a graphql endpoint
     * @param {Object} data - Data from previous query, used for recursion to fetch all tags
     * @return {undefined} no return value
     */
    fetchMoreDataIfNecessary = (fetchMore, data) => {
      const { primaryShopId } = this.props;
      const pageInfo = data && data.tags.pageInfo;

      if (pageInfo && pageInfo.hasNextPage) {
        fetchMore({
          variables: {
            shopId: primaryShopId,
            cursor: pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { tags: { edges: newEdges, pageInfo: newPageInfo } } = fetchMoreResult;

            // Return with additional results
            if (newEdges.length) {
              // Concat the previous and next data
              let newEdgesArray = [...previousResult.tags.edges, ...newEdges];

              // Remove duplicates
              newEdgesArray = newEdgesArray.filter((obj, pos, arr) => (
                arr
                  .map(({ node }) => node._id)
                  .indexOf(obj.node._id) === pos
              ));

              return {
                tags: {
                  __typename: previousResult.tags.__typename,
                  edges: newEdgesArray,
                  pageInfo: newPageInfo
                }
              };
            }

            // Send the previous result if the new result contains no additional data
            return previousResult;
          }
        }).catch(() => {
          /*
            Catch errors, namely `TypeError: Cannot set property 'networkStatus' of undefined` which seems to be
            an Apollo issue: https://github.com/apollographql/apollo-client/issues/2539
          */
        });
      }
    }

    render() {
      const { primaryShopId } = this.props;

      return (
        <Query query={tagsQuery} variables={{ shopId: primaryShopId }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading || error) return null;
            if (!data || !data.tags) return null;

            // Recursively more tags until we can fetch no more
            this.fetchMoreDataIfNecessary(fetchMore, data);

            return (
              <Provider tags={data.tags}>
                <Component
                  {...this.props}
                  tags={data.tags}
                />
              </Provider>
            );
          }}
        </Query>
      );
    }
  }

  hoistNonReactStatic(WithTag, Component);

  return WithTag;
}
