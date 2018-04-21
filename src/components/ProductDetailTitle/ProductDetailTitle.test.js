import React from "react";
import renderer from "react-test-renderer";
import ProductDetailTitle from "./ProductDetailTitle";

test("basic snapshot", () => {
  const component = renderer.create(<ProductDetailTitle title="Title" pageTitle="Subtitle" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with only title", () => {
  const component = renderer.create(<ProductDetailTitle title="Title" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with only pageTitle", () => {
  const component = renderer.create(<ProductDetailTitle pageTitle="Subtitle" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with neither title nor pageTitle", () => {
  const component = renderer.create(<ProductDetailTitle />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
