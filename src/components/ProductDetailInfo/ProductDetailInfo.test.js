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

test("snapshot with price only", () => {
  const component = renderer.create((
    <ProductDetailInfo
      priceRange="$19.99"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with vendor only", () => {
  const component = renderer.create((
    <ProductDetailInfo
      vendor="Vendor"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with description only", () => {
  const component = renderer.create((
    <ProductDetailInfo
      description="Description"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with price and description", () => {
  const component = renderer.create((
    <ProductDetailInfo
      priceRange="$19.99"
      description="Description"
    />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with no props", () => {
  const component = renderer.create(<ProductDetailInfo />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
