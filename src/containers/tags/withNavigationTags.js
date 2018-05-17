import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { computed, observable, action, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import navigationTagsQuery from "./navigationTags.gql";

/**
 * withNavigationTags higher order query component for fetching tags for the navigation
 * @name NavigationTags
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

      // With a list of tags
      if (tags && tags.edges) {
        // If the there are subTags, we'll fetch them now
        if (Array.isArray(subTagIds) && subTagIds.length) {
          const subTags = [];

          for (const subTagId of subTagIds) {
            const foundTagEdge = tags.edges.find(({ node }) => (node._id === subTagId));

            if (foundTagEdge) {
              const { node: subTag } = foundTagEdge;
              if (subTag.subTagIds && Array.isArray(subTag.subTagIds)) {
                subTag.subTags = { edges: this.getTagTree(subTag.subTagIds) };
              }

              subTags.push({ node: subTag });
            }
          }

          return subTags;
        } else if (!subTagIds) {
          // Return the list of top-level tags
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
