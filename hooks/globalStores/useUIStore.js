import { useContext } from "react";
import { UIContext } from "context/UIContext";

/**
 * Gets the UI store React context
 *
 * @returns {Object} React context for UI store
 */
export default function useUIStore() {
  const uiContext = useContext(UIContext);
  return uiContext;
}
