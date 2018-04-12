import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { computed, observable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import navigationTagsQuery from "./navigationTags.gql";

/**
 * withNavigationTags higher order query component for fetching tags for the navigation
 * @name withShop
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `navItems` prop
 */
export default (Component) => (
  @inject("primaryShopId")
  @observer
  class NavigationTags extends React.Component {
    static propTypes = {
      /**
       * ShopId used to obtain tags for
       */
      primaryShopId: PropTypes.string.isRequired
    }

    @observable _data = {}

    @computed get data() { return toJS(this._data); }
    set data(value) { this._data = value; }

    /**
     * Generates a tree from the given array of subTagIds.
     * @param {[String]} [subTagIds] - Array of tag ids. Starts from top-level tags if undefined
     * @return {Array} array of tags
     */
    getTagTree = action((subTagIds) => {
      const { tags } = this.data;

      if (tags && tags.edges) {
        if (Array.isArray(subTagIds) && subTagIds.length) {
          return subTagIds.map((subTagId) => (
            tags.edges.find(({ node }) => (node._id === subTagId))
          ));
        } else if (!subTagIds) {
          return tags.edges
            .filter(({ node }) => node.isTopLevel)
            .map(({ node }) => {
              if (node.subTagIds && Array.isArray(node.subTagIds)) {
                node.subTags = { edges: this.getTagTree(node.subTagIds) };
              }

              return { node };
            });
        }
      }

      return [];
    })

    /**
     * Generates a tree from the given array of subTagIds.
     * @param {Function} fetchMore - Function used to fetch more data from a graphql endpoint
     * @param {Object} data - Data from previous query, used for recustion to fetch all tags
     * @return {undefined} no return value
     */
    @action fetchMoreDataIfNecessary = (fetchMore, data) => {
      const { primaryShopId } = this.props;
      const pageInfo = data && data.tags.pageInfo;

      if (pageInfo && pageInfo.hasNextPage) {
        fetchMore({
          variables: {
            shopId: primaryShopId,
            cursor: pageInfo.endCursor
          },
          updateQuery: action((previousResult, { fetchMoreResult }) => {
            const { tags: { edges: newEdges, pageInfo: newPageInfo } } = fetchMoreResult;

            // With additional results
            if (newEdges.length) {
              // If we have next page, then continue on
              if (newPageInfo.hasNextPage) {
                // continue on
                return this.fetchMoreDataIfNecessary(fetchMore, data);
              }

              // Otherwise stop here
              return {
                tags: {
                  __typename: previousResult.tags.__typename,
                  edges: [...previousResult.tags.edges, ...newEdges],
                  pageInfo: newPageInfo
                }
              };
            }

            // Send the previous result if the new result contians no additional data
            return previousResult;
          })
        }).catch((error) => {
          console.log(error); /* eslint-disable-line no-console */
        });
      }
    }

    render() {
      const { primaryShopId } = this.props;

      return (
        <Query query={navigationTagsQuery} variables={{ shopId: primaryShopId }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading || error) return null;
            if (!data || !data.tags) return null;

            this.data = data;

            // Recursively more tags until we can fetch no more
            this.fetchMoreDataIfNecessary(fetchMore, data);

            return (
              <Component
                {...this.props}
                navItems={{ edges: this.getTagTree(null, this.data) }}
              />
            );
          }}
        </Query>
      );
    }
  }
);
