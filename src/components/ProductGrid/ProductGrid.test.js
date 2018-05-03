import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import ProductGrid from "./ProductGrid";
import products from "./__mocks__/products.mock";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: "http://localhost:3000"
    }
  }
};

test("basic snapshot", () => {
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: true,
    loadNextPage: () => {},
    loadPreviousPage: () => {},
    startCursot: "",
    endCursor: ""
  };

  const component = renderer.create((
    <Provider uiStore={uiStore}>
      <ProductGrid
        catalogItems={products}
        pageInfo={pageInfo}
        primaryShopId="123"
      />
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
