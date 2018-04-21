import React from "react";
import renderer from "react-test-renderer";
import ProductItem from "./ProductItem";
import product from "./__mocks__/product.mock";

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: "http://localhost:300"
    }
  }
};

test("basic snapshot", () => {
  const component = renderer.create(<ProductItem product={product} uiStore={uiStore}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
