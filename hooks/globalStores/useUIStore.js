import { useContext } from "react";
import { UIContext } from "context/UIContext";

export default function useUIStore() {
  const uiContext = useContext(UIContext);
  return uiContext;
}