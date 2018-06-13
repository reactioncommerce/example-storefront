import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import product from "components/ProductDetail/__mocks__/productData.mock";
import ProductItem from "./ProductItem";

test("basic snapshot", () => {
  const component = renderer.create(shallow(<ProductItem currencyCode="USD" product={product} />).get(1));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
