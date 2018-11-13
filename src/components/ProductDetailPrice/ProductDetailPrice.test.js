import React from "react";
import renderer from "react-test-renderer";
import ProductDetailPrice from "./ProductDetailPrice";

test("price", () => {
  const component = renderer.create((
    <ProductDetailPrice price="$19.99" />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("no price", () => {
  const component = renderer.create((
    <ProductDetailPrice />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("no price, compareAtPrice", () => {
  const component = renderer.create((
    <ProductDetailPrice compareAtPrice="$29.99" />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("price and compareAtPrice", () => {
  const component = renderer.create((
    <ProductDetailPrice compareAtPrice="$29.99" price="$19.99" />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
