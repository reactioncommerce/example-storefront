import React, { createContext } from "react";
import PropTypes from "prop-types";

export const ShopContext = createContext();

export const ShopProvider = ({ shop, children }) => (
  <ShopContext.Provider value={shop}>
    {children}
  </ShopContext.Provider>
);

ShopProvider.propTypes = {
  children: PropTypes.node,
  shop: PropTypes.object
};
