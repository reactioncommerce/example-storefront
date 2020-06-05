import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

/**
 * Gets the auth store context
 *
 * @returns {Object} the React context fro the auth store
 */
export default function useAuthStore() {
  const authContext = useContext(AuthContext);
  return authContext;
}
