import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import ProductGridHero from "./ProductGridHero";

const tagWithMedia = {
  name: "TagWithMedia",
  _id: "rubhpcpSzrgZuBCEM",
  slug: "tag-with-media",
  isTopLevel: true,
  updatedAt: "2018-05-25 17:48:29.745Z",
  createdAt: "2018-05-25 17:48:29.745Z",
  isDeleted: false,
  isVisible: true,
  groups: [],
  shopId: "J8Bhq3uTtdgwZx3rz",
  heroMediaUrl: "https://www.reactioncommerce.com/assets/careers-images-2.jpg"
};

const tagWithoutMedia = {
  name: "TagWithoutMedia",
  _id: "rubhpcpSzrgZuBCEM",
  slug: "tag-withpoiut-media",
  isTopLevel: true,
  updatedAt: "2018-05-25 17:48:29.745Z",
  createdAt: "2018-05-25 17:48:29.745Z",
  isDeleted: false,
  isVisible: true,
  groups: [],
  shopId: "J8Bhq3uTtdgwZx3rz"
};

test("snapshot of tagWithMedia", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <ProductGridHero tag={tagWithMedia} />
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshop of tagWithoutMedia", () => {
  const component = renderer.create(<MuiThemeProvider theme={theme}>
    <ProductGridHero tag={tagWithoutMedia} />
  </MuiThemeProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
