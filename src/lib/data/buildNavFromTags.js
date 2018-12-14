/**
 * @summary Generates a tree from the given array of subTagIds. Calls itself recursively.
 * @param {Object[]} tags - All tags retrieved from GraphQL
 * @param {String[]} [subTagIds] - Array of tag IDs for this level. Starts from top-level tags if undefined
 * @return {Object[]} Array of tags at this level
 */
export default function buildNavFromTags(tags, subTagIds) {
  if (!Array.isArray(tags)) return [];

  if (!subTagIds) {
    // Return the list of top-level tags
    return tags
      .filter((tag) => tag.isTopLevel)
      .map((tag) => {
        let subTags;
        if (Array.isArray(tag.subTagIds)) {
          subTags = buildNavFromTags(tags, tag.subTagIds);
        }

        return { node: { ...tag, subTags } };
      });
  }

  const subTags = [];

  for (const subTagId of subTagIds) {
    const subTag = tags.find((tag) => (tag._id === subTagId));

    if (subTag) {
      let subSubTags;
      if (Array.isArray(subTag.subTagIds)) {
        subSubTags = buildNavFromTags(tags, subTag.subTagIds);
      }

      subTags.push({ node: { ...subTag, subTags: subSubTags } });
    }
  }

  return subTags;
}
