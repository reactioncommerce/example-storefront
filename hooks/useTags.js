import { useContext } from "react";
import { TagsContext } from "context/TagsContext";

/**
 * Get the tags React context
 *
 * @returns {Object} the tags React context
 */
export default function useTags() {
  const tagsContext = useContext(TagsContext);
  return tagsContext;
}
