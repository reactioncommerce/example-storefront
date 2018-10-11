import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import NavigationSubMenuMobile from "./NavigationSubMenuMobile";

const mockTagWithSubTags = {
  _id: "cmVhY3Rpb24vdGFnOjVXZE5LYXprejZ5TWdrcGY5",
  position: null,
  slug: "tag-slug",
  name: "Tag Name",
  subTags: {
    edges: [
      {
        node: {
          _id: "cmVhY3Rpb24vdGFnOlRFdjdSV1pDTHl1d1dmOWs2",
          position: null,
          slug: "sub-tag-slug",
          name: "Sub Tag Name",
          subTags: {
            edges: []
          }
        }
      },
      {
        node: {
          _id: "cmVhY3Rpb24vdGFnOmJ2MmVEbzV3V3lvNUdNMlN3",
          position: null,
          slug: "sub-tag-slug",
          name: "Sub Tag name",
          subTags: {
            edges: []
          }
        }
      }
    ]
  }
};

const uiStore = {
  toggleMenuDrawerOpen() {}
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

test("basic snapshot", () => {
  const component = renderer.create((
    <Provider primaryShopId={"J8Bhq3uTtdgwZx3rz"} routingStore={routingStore} uiStore={uiStore}>
      <NavigationSubMenuMobile navItem={mockTagWithSubTags} />
    </Provider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
