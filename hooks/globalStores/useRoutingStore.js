import { useContext } from "react";
import { RoutingContext } from "context/RoutingContext";

export default function useRoutingStore() {
  const routingContext = useContext(RoutingContext);
  return routingContext;
}
