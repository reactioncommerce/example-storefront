import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import ProductGrid from "./ProductGrid";
import products from "./__mocks__/products.mock";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: "http://localhost:3000"
    }
  }
};

const routingStore = {
  pathname: "tag",
  query: {
    slug: "test-tag",
    querystring: "?this&that"
  }
};

test("basic snapshot", () => {
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: true,
    loadNextPage: () => {},
    loadPreviousPage: () => {},
    startCursor: "",
    endCursor: ""
  };

  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider routingStore={routingStore} uiStore={uiStore}>
        <ProductGrid
          catalogItems={products}
          currencyCode="USD"
          pageInfo={pageInfo}
          pageSize={20}
          primaryShopId="123"
          setPageSize={() => true}
          setSortBy={() => true}
          sortBy={"updatedAt-desc"}
        />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Empty product grid message", () => {
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: true,
    loadNextPage: () => {},
    loadPreviousPage: () => {},
    startCursor: "",
    endCursor: ""
  };

  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider routingStore={routingStore} uiStore={uiStore}>
        <ProductGrid
          catalogItems={null}
          currencyCode="USD"
          pageInfo={pageInfo}
          pageSize={20}
          primaryShopId="123"
          setPageSize={() => true}
          setSortBy={() => true}
          sortBy={"updatedAt-desc"}
        />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
