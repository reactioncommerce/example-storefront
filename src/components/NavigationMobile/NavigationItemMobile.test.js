import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import NavigationItemMobile from "./NavigationItemMobile";

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
  const component = renderer.create(shallow(<NavigationItemMobile navItem={mockTag} />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with related items", () => {
  const component = renderer.create(<NavigationItemMobile navItem={mockTagWithSubTags} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
