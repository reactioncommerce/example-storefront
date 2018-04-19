import React from "react";
import renderer from "react-test-renderer";
import ProductDetailTitle from "./ProductDetailTitle";

test("basic snapshot", () => {
  const component = renderer.create(<ProductDetailTitle title="Title" pageTitle="Subtitle" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
