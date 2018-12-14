import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "custom/reactionTheme";
import Breadcrumbs from "./Breadcrumbs";

const tags = [
  {
    _id: "v2hE7fzL6cJniwgSm",
    createdAt: "2018-06-11T18:00:48.414Z",
    groups: [],
    isDeleted: false,
    isTopLevel: true,
    isVisible: true,
    name: "Tag A",
    shopId: "J8Bhq3uTtdgwZx3rz",
    slug: "tag-a",
    subTagIds: [
      "s3nybDz4QPkmapETc",
      "JB4FRBiWduNsxhhhn",
      "gRM3ADcY77eNJ7Brm"
    ],
    updatedAt: "2018-06-11T18:01:09.568Z"
  }, {
    _id: "s3nybDz4QPkmapETc",
    createdAt: "2018-06-11T18:01:02.411Z",
    groups: [],
    isDeleted: false,
    isTopLevel: false,
    isVisible: true,
    name: "Tag A-1",
    shopId: "J8Bhq3uTtdgwZx3rz",
    slug: "tag-a-1",
    subTagIds: [],
    updatedAt: "2018-06-11T18:01:02.411Z"
  }, {
    _id: "JB4FRBiWduNsxhhhn",
    createdAt: "2018-06-11T18:01:06.975Z",
    groups: [],
    isDeleted: false,
    isTopLevel: false,
    isVisible: true,
    name: "Tag A-2",
    shopId: "J8Bhq3uTtdgwZx3rz",
    slug: "tag-a-2",
    subTagIds: [],
    updatedAt: "2018-06-11T18:01:06.975Z"
  }, {
    _id: "gRM3ADcY77eNJ7Brm",
    createdAt: "2018-06-11T18:01:09.565Z",
    groups: [],
    isDeleted: false,
    isTopLevel: false,
    isVisible: true,
    name: "Tag A-3",
    shopId: "J8Bhq3uTtdgwZx3rz",
    slug: "tag-a-3",
    subTagIds: [],
    updatedAt: "2018-06-11T18:01:09.565Z"
  }
];

const routingStore = {
  tagId: "v2hE7fzL6cJniwgSm"
};

test("tagGrid top level tag", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider primaryShopId={"J8Bhq3uTtdgwZx3rz"} routingStore={routingStore}>
        <Breadcrumbs isTagGrid tagId="v2hE7fzL6cJniwgSm" tags={tags} />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("tagGrid secondlevel tag", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider routingStore={routingStore}>
        <Breadcrumbs isTagGrid tagId="s3nybDz4QPkmapETc" tags={tags} />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
