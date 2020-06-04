import { useContext } from "react";
import { CartContext } from "context/CartContext";

export default function useCartStore() {
  const cartContext = useContext(CartContext);
  return cartContext;
}
