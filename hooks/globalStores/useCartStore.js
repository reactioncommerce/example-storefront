import { useContext } from "react";
import { CartContext } from "context/CartContext";

/**
 * Gets the cart store contxet
 *
 * @returns {Object} the React context for the cart store
 */
export default function useCartStore() {
  const cartContext = useContext(CartContext);
  return cartContext;
}
