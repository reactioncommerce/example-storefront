import { useContext } from "react";
import { TagsContext } from "context/TagsContext";

export default function useTags() {
  const tagsContext = useContext(TagsContext);
  return tagsContext;
}
