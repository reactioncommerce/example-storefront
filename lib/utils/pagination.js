/**
 * Load next page of content for a Apollo GraphQL query
 * @name loadNextPage
 * @param {Object} args Args for pagination
 * @param {String} args.queryName Name of the GraphQL whose result will be used to paginate
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
    routingStore.setSearch({ limit, after: cursor });
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

      // Send the previous result if the new result contains no additional data
      return previousResult;
    }
  });
};

/**
 * Load previous page of content for a Apollo GraphQL query
 * @name loadPreviousPage
 * @param {Object} args Args for pagination
 * @param {String} args.queryName Name of the GraphQL whose result will be used to paginate
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
    routingStore.setSearch({ limit, before: cursor });
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

      // Send the previous result if the new result contains no additional data
      return previousResult;
    }
  });
};

/**
 * Create pagination functions for next and previous and page info data
 * @name pagination
 * @param {Object} args Args for pagination
 * @param {String} args.queryName Name of the GraphQL whose result will be used to paginate
 * @param {Object} args.data Full result from GraphQl
 * @param {Object} args.limit Limit
 * @param {Object} args.fetchMore fetchMore function
 * @returns {Function} load next page function
 */
export const pagination = (args) => {
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
 * Create an object of variables for pagination a GraphQL query.
 * @name paginationVariablesFromUrlParams
 * @param {Object} params Object of params to create query variables from
 * @param {Number|String} params.limit Maximum number of items to get
 * @param {String} params.before Before Cursor
 * @param {String} params.after After cursor
 * @param {Options} options Additional options
 * @param {Number} options.defaultLimit After cursor
 * @returns {Object} Object of variables for GraphQL query
 */
export const paginationVariablesFromUrlParams = (params, options) => {
  const { limit, before, after } = params || {};
  const { defaultPageLimit } = options || {};
  const variables = {};

  if (limit && after) {
    variables.first = parseInt(limit, 10);
  } else if (limit && before) {
    variables.last = parseInt(limit, 10);
  } else if (limit) {
    variables.first = parseInt(limit, 10);
  } else if (defaultPageLimit) {
    variables.first = defaultPageLimit;
  }

  if (after) {
    variables.after = after;
  } else if (before) {
    variables.before = before;
  }

  return variables;
};
