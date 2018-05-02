/**
 * Update catalogItems page info
 * @param {Object} data data returend from GraphQL query
 * @param {Object} pageInfo PageInfo to update
 * @returns {Object} data containing the updated page info for catalofItems
 */
export function extendPageInfo(data, pageInfo) {
  return {
    ...data,
    catalogItems: {
      ...data.catalogItems,
      pageInfo: {
        ...data.catalogItems.pageInfo,
        ...pageInfo
      }
    }
  };
}

/**
 * Load next page of content for a Apollo GraphQL query
 * @name loadPreviousPage
 * @param {Object} args Args for paganation
 * @param {String} args.queryName Name of the GraphQL whos result will be used to paganate
 * @param {Object} args.data Full result from GraphQl
 * @param {Object} args.limit Limit
 * @param {Object} args.fetchMore fetchMore function
 * @returns {Function} load next page function
 */
export const loadNextPage = ({ queryName, data, limit, fetchMore }) => () => {
  if (!queryName) {
    throw new Error("queryName is required");
  }

  fetchMore({
    variables: {
      first: limit,
      after: data[queryName].pageInfo.endCursor
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const { [queryName]: items } = fetchMoreResult;

      // Return with additional results
      if (items.edges.length) {
        return extendPageInfo(fetchMoreResult, {
          hasPreviousPage: true
        });
      }

      // Send the previous result if the new result contians no additional data
      return extendPageInfo(previousResult, {
        hasPreviousPage: previousResult[queryName].edges.length > previousResult[queryName].totalCount
      });
    }
  });
};

/**
 * Load previous page of content for a Apollo GraphQL query
 * @name loadPreviousPage
 * @param {Object} args Args for paganation
 * @param {String} args.queryName Name of the GraphQL whos result will be used to paganate
 * @param {Object} args.data Full result from GraphQl
 * @param {Object} args.limit Limit
 * @param {Object} args.fetchMore fetchMore function
 * @returns {Function} load next page function
 */
export const loadPreviousPage = ({ queryName, data, limit, fetchMore }) => () => {
  fetchMore({
    variables: {
      last: limit,
      first: null,
      before: data[queryName].pageInfo.startCursor
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const { [queryName]: items } = fetchMoreResult;

      // Return with additional results
      if (items.edges.length && items.pageInfo.hasPreviousPage) {
        return extendPageInfo(fetchMoreResult, {
          hasNextPage: fetchMoreResult[queryName].edges.length <= fetchMoreResult[queryName].totalCount
        });
      }

      // Send the previous result if the new result contians no additional data
      return extendPageInfo(previousResult, {
        hasPreviousPage: false,
        hasNextPage: previousResult[queryName].edges.length <= previousResult[queryName].totalCount
      });
    }
  });
};

/**
 * Create paganation functions for next and previous and page info data
 * @name paganation
 * @param {Object} args Args for paganation
 * @param {String} args.queryName Name of the GraphQL whos result will be used to paganate
 * @param {Object} args.data Full result from GraphQl
 * @param {Object} args.limit Limit
 * @param {Object} args.fetchMore fetchMore function
 * @returns {Function} load next page function
 */
export const paganation = (args) => {
  const { queryName, data } = args;
  const pageInfo = (data[queryName] && data[queryName].pageInfo) || {};

  return {
    ...pageInfo,
    loadNextPage: loadNextPage(args),
    loadPreviousPage: loadPreviousPage(args)
  };
};
