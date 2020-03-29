import React, { createContext } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ shop, children }) => (
  <ShopContext.Provider value={shop}>
    {children}
  </ShopContext.Provider>
);
