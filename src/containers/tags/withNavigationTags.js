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
  @inject("tags")
  @observer
  class NavigationTags extends React.Component {
    static propTypes = {
      /**
       * ShopId used to obtain tags for
       */
      primaryShopId: PropTypes.string.isRequired,
      /**
       * Object of tags available to shop
       */
      tags: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object).isRequired
      })
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

    render() {
      const { tags } = this.props;

      this.data = { tags };

      return (
        <Component
          {...this.props}
          navItems={{ edges: this.getTagTree(null, this.data) }}
        />
      );
    }
  }
);
