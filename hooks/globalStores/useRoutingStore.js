import { useContext } from "react";
import { RoutingContext } from "context/RoutingContext";

/**
 * Gets the routing store context
 *
 * @returns {Object} the React context for routing store
 */
export default function useRoutingStore() {
  const routingContext = useContext(RoutingContext);
  return routingContext;
}
