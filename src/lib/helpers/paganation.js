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
export const loadNextPage = ({ queryName, data, limit, fetchMore, routingStore }) => () => {
  if (!queryName) throw new Error("queryName is required");

  const cursor = data[queryName].pageInfo.endCursor;

  // Set URL search params to allow for link sharing
  if (routingStore) {
    routingStore.setSearch(`first=${limit}&after=${cursor}}`);
  }

  fetchMore({
    variables: {
      first: limit,
      after: cursor,
      last: null,
      before: null
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const { [queryName]: items } = fetchMoreResult;

      // Return with additional results
      if (items.edges.length) {
        return fetchMoreResult;
      }

      // Send the previous result if the new result contians no additional data
      return previousResult;
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
export const loadPreviousPage = ({ queryName, data, limit, fetchMore, routingStore }) => () => {
  if (!queryName) throw new Error("queryName is required");

  const cursor = data[queryName].pageInfo.startCursor;

  // Set URL search params to allow for link sharing
  if (routingStore) {
    routingStore.setSearch(`last=${limit}&before=${cursor}`);
  }

  fetchMore({
    variables: {
      first: null,
      after: null,
      last: limit,
      before: cursor
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const { [queryName]: items } = fetchMoreResult;

      // Return with additional results
      if (items.edges.length) {
        return fetchMoreResult;
      }

      // Send the previous result if the new result contians no additional data
      return previousResult;
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

  if (!queryName) throw new Error("queryName is required");

  const pageInfo = (data && data[queryName] && data[queryName].pageInfo) || {};

  return {
    ...pageInfo,
    loadNextPage: loadNextPage(args),
    loadPreviousPage: loadPreviousPage(args)
  };
};

/**
 * Create an object of variables for paganation a GraphQL query.
 * @name paganationVariablesFromUrlParams
 * @param {Object} params Object of params to create query variables from
 * @param {Number|String} params.first Limit starting at the beginning of the list
 * @param {Number|String} params.last Limit starting at the end of the list
 * @param {String} params.before Before Cursor
 * @param {String} params.after After cursor
 * @returns {Object} Object of variables for GraphQL query
 */
export const paganationVariablesFromUrlParams = (params) => {
  const { first, last, before, after } = params || {};
  const variables = {};

  if (first) {
    variables.first = parseInt(first, 10);
  } else if (last) {
    variables.last = parseInt(last, 10);
  }

  if (before) {
    variables.before = before;
  } else if (after) {
    variables.after = after;
  }

  return variables;
};
