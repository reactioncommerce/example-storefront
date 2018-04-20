import React from "react";
import renderer from "react-test-renderer";
import ProductDetailInfo from "./ProductDetailInfo";

test("basic snapshot", () => {
  const component = renderer.create((
    <ProductDetailInfo
      priceRange="$19.99"
      vendor="Vendor"
      description="Description"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
