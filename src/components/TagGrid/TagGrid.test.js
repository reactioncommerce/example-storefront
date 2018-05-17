import React from "react";
import renderer from "react-test-renderer";
import TagGrid from "./TagGrid";

const tags = [
  {
    position: null,
    name: "Shoes",
    slug: "shoes"
  },
  {
    position: null,
    name: "Shop",
    slug: "shop"
  }
];

test("basic snapshot", () => {
  const component = renderer.create((
    <TagGrid tags={tags} />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
