import React from "react";
import renderer from "react-test-renderer";
import NavigationItemDesktop from "./NavigationItemDesktop";

const mockTag = {
  _id: "123",
  name: "Shop",
  slug: "shop"
};

const mockTagWithSubTags = {
  _id: "123",
  name: "Shop",
  slug: "shop",
  subTags: {
    edges: []
  }
};

test("basic snapshot", () => {
  const component = renderer.create(<NavigationItemDesktop navItems={mockTag} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with related items", () => {
  const component = renderer.create(<NavigationItemDesktop navItems={mockTagWithSubTags} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
