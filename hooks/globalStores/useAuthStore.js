import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

export default function useAuthStore() {
  const authContext = useContext(AuthContext);
  return authContext;
}
