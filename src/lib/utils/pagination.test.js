import {
  loadNextPage,
  loadPreviousPage,
  pagination,
  paginationVariablesFromUrlParams
} from "./pagination";

const args = {
  fetchMore: jest.fn(({ updateQuery }) => {
    updateQuery(args.data, {
      fetchMoreResult: {
        test: {
          edges: []
        }
      }
    });
  }),
  routingStore: {
    setSearch: jest.fn()
  },
  queryName: "test",
  limit: 5,
  data: {
    test: {
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: "1",
        endCursor: "5"
      },
      edges: [
        { cursor: "1", node: { title: "1" } },
        { cursor: "2", node: { title: "2" } },
        { cursor: "3", node: { title: "3" } },
        { cursor: "4", node: { title: "4" } },
        { cursor: "5", node: { title: "5" } }
      ]
    }
  }
};

test("pagination helper creates helper function props", () => {
  const props = pagination(args);

  expect(typeof props.loadNextPage).toBe("function");
  expect(typeof props.loadPreviousPage).toBe("function");
});


test("loadNextPage helper creates helper function", () => {
  const func = loadNextPage(args);

  // Call function to ensure methods it calls, are called
  func();
  expect(args.fetchMore).toHaveBeenCalled();
  expect(args.routingStore.setSearch).toHaveBeenCalled();
});

test("loadPreviousPage helper creates helper function", () => {
  const func = loadPreviousPage(args);

  // Call function to ensure methods it calls, are called
  func();
  expect(args.fetchMore).toHaveBeenCalled();
  expect(args.routingStore.setSearch).toHaveBeenCalled();
});

test("pagination variables from url params, (limit, after)", () => {
  const variables = paginationVariablesFromUrlParams({
    limit: 2,
    after: "6"
  });

  expect(variables).toEqual({
    first: 2,
    after: "6"
  });
});

test("pagination variables from url params, (before, limit)", () => {
  const variables = paginationVariablesFromUrlParams({
    limit: 10,
    before: "3"
  });

  expect(variables).toEqual({
    last: 10,
    before: "3"
  });
});

test("pagination variables from url params with defaultPageLimit", () => {
  const variables = paginationVariablesFromUrlParams({
    after: "6"
  }, { defaultPageLimit: 10 });

  expect(variables).toEqual({
    first: 10,
    after: "6"
  });
});
