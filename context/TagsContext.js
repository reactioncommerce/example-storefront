import React, { createContext } from "react";
import PropTypes from "prop-types";

export const TagsContext = createContext();

/**
 *
 * @param {Array} tags - an array of tags
 * @param {React.node} children - the react elements to wrap
 * @returns {React.node} The tags provider
 */
export const TagsProvider = ({ tags, children }) => (
  <TagsContext.Provider value={tags}>
    {children}
  </TagsContext.Provider>
);

TagsProvider.propTypes * {
  children: PropTypes.node,
  tags: PropTypes.arrayOf(PropTypes.object)
};
