import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import theme from "lib/theme/reactionTheme";
import ProductDetail from "./ProductDetail";
import sampleData from "./__mocks__/productData.mock";

jest.mock("next/router");

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

const shop = {
  name: "Reaction"
}

const uiStore = {
  appConfig: {
    publicRuntimeConfig: {
      externalAssetsUrl: ""
    }
  },
  pdpSelectedVariantId: "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3RWYXJpYW50OjZxaXFQd0JrZUpkdGRRYzRH",
  setPDPSelectedVariantId: jest.fn().mockName("uiStore.setPDPSelectedVariantId")
};

test("basic snapshot", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <Provider primaryShopId={"J8Bhq3uTtdgwZx3rz"} routingStore={routingStore} uiStore={uiStore}>
        <ProductDetail product={sampleData} shop={shop} currencyCode={"USD"} />
      </Provider>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
