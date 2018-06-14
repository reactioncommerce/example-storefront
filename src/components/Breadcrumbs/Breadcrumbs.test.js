import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import product from "components/ProductDetail/__mocks__/productData.mock";
import Breadcrumbs from "./Breadcrumbs";

const tags = {
  edges: [
    {
      node: {
        _id: "v2hE7fzL6cJniwgSm",
        name: "Tag A",
        slug: "tag-a",
        shopId: "J8Bhq3uTtdgwZx3rz",
        isTopLevel: true,
        updatedAt: "2018-06-11T18:01:09.568Z",
        createdAt: "2018-06-11T18:00:48.414Z",
        isDeleted: false,
        isVisible: true,
        groups: [],
        subTagIds: [
          "s3nybDz4QPkmapETc",
          "JB4FRBiWduNsxhhhn",
          "gRM3ADcY77eNJ7Brm"
        ]
      }
    }, {
      node: {
        _id: "s3nybDz4QPkmapETc",
        name: "Tag A-1",
        slug: "tag-a-1",
        shopId: "J8Bhq3uTtdgwZx3rz",
        isTopLevel: false,
        updatedAt: "2018-06-11T18:01:02.411Z",
        createdAt: "2018-06-11T18:01:02.411Z",
        isDeleted: false,
        isVisible: true,
        groups: []
      }
    }, {
      node: {
        _id: "JB4FRBiWduNsxhhhn",
        name: "Tag A-2",
        slug: "tag-a-2",
        shopId: "J8Bhq3uTtdgwZx3rz",
        isTopLevel: false,
        updatedAt: "2018-06-11T18:01:06.975Z",
        createdAt: "2018-06-11T18:01:06.975Z",
        isDeleted: false,
        isVisible: true,
        groups: []
      }
    }, {
      node: {
        _id: "gRM3ADcY77eNJ7Brm",
        name: "Tag A-3",
        slug: "tag-a-3",
        shopId: "J8Bhq3uTtdgwZx3rz",
        isTopLevel: false,
        updatedAt: "2018-06-11T18:01:09.565Z",
        createdAt: "2018-06-11T18:01:09.565Z",
        isDeleted: false,
        isVisible: true,
        groups: []
      }
    }
  ]
};

const routingStore = {
  tag: {
    _id: "v2hE7fzL6cJniwgSm",
    name: "Tag A",
    slug: "tag-a",
    shopId: "J8Bhq3uTtdgwZx3rz",
    isTopLevel: true,
    updatedAt: "2018-06-11T18:01:09.568Z",
    createdAt: "2018-06-11T18:00:48.414Z",
    isDeleted: false,
    isVisible: true,
    groups: [],
    relatedTagIds: [
      "s3nybDz4QPkmapETc",
      "JB4FRBiWduNsxhhhn",
      "gRM3ADcY77eNJ7Brm"
    ]
  }
};

test("tagGrid top level tag", () => {
  const nodes = tags.edges.map((edge) => edge.node);
  const tag = nodes.find((findTag) => findTag._id === "v2hE7fzL6cJniwgSm");

  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider primaryShopId={"J8Bhq3uTtdgwZx3rz"} routingStore={routingStore}>
        <Breadcrumbs isTagGrid={true} tag={tag} tags={tags} />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("tagGrid secondlevel tag", () => {
  const nodes = tags.edges.map((edge) => edge.node);
  const tag = nodes.find((findTag) => findTag._id === "s3nybDz4QPkmapETc");

  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider routingStore={routingStore}>
        <Breadcrumbs isTagGrid={true} tag={tag} tags={tags} />
      </Provider>
      </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
