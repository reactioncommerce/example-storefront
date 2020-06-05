import { useContext } from "react";
import { ShopContext } from "context/ShopContext";

/**
 * Get the shop React context
 *
 * @returns {Object} the shop React context
 */
export default function useShop() {
  const shopContext = useContext(ShopContext);
  return shopContext;
}
