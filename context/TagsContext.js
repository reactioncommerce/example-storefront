import React, { createContext } from "react";

export const TagsContext = createContext();

export const TagsProvider = ({ tags, children }) => (
  <TagsContext.Provider value={tags}>
    {children}
  </TagsContext.Provider>
);