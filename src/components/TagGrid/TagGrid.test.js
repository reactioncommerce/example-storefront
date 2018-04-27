import React from "react";
import renderer from "react-test-renderer";
import TagGrid from "./TagGrid";

const tags = [
  {
    node: {
      position: null,
      name: "Shoes",
      slug: "shoes"
    }
  },
  {
    node: {
      position: null,
      name: "Shop",
      slug: "shop"
    }
  }
];

test("basic snapshot", () => {
  const component = renderer.create((
    <TagGrid tags={tags} />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
