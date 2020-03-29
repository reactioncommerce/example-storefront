import { useContext } from "react";
import { ShopContext } from "context/ShopContext";

export default function useShop() {
  const shopContext = useContext(ShopContext);
  return shopContext;
}
