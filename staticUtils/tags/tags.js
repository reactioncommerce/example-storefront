export default `
query tagsQuery($shopId: ID!, $cursor: ConnectionCursor) {
  tags(shopId: $shopId, first: 200, after: $cursor, sortBy: createdAt) {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        ...TagInfo
      }
    }
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
