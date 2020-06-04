export default `
query tagQuery($shopId: ID!, $slugOrId: String!) {
    tag(shopId: $shopId, slugOrId: $slugOrId) {
      ...TagInfo
    }
}
fragment TagInfo on Tag {
    _id
    position
    name
    slug
    isTopLevel
    subTagIds
    heroMediaUrl
    metafields {
      key
      namespace
      scope
      value
    }
    displayTitle
}  
`;
