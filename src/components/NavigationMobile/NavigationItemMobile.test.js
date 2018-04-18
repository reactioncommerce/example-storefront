import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import NavigationItemMobile from "./NavigationItemMobile";

const testMenuItem = {
  _id: "123",
  name: "Shop",
  slug: "shop"
};

const testMenuItemWithRelatedTags = {
  _id: "123",
  name: "Shop",
  slug: "shop",
  relatedTags: [
    { _id: "111", name: "Clothes", slug: "clothes" },
    { _id: "222", name: "Shoes", slug: "shoes" },
    { _id: "333", name: "Accessories", slug: "accessories" }
  ]
};

test("basic snapshot", () => {
  const component = renderer.create(shallow(<NavigationItemMobile navItmes={testMenuItem} />).get(3));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with related items", () => {
  const component = renderer.create(<NavigationItemMobile navItmes={testMenuItemWithRelatedTags} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
