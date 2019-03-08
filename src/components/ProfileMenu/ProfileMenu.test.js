import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { Provider } from "mobx-react";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import primaryShopQuery from "containers/common-gql/primaryShop.gql";
import ProfileMenu from "./ProfileMenu";

const authStore = {
  account: {
    firstName: "Reaction",
    lastName: "Commerce",
    name: "Reaction",
    primaryEmailAddress: "test@reactioncommerce.com",
    profileImage: "img.jpg"
  }
};

const shop = {
  _id: "reaction/shop:1234",
  description: null,
  name: "Reaction",
  currency: {
    code: "USD"
  }
};

const mocks = [
  {
    request: {
      query: primaryShopQuery,
      variables: {
        language: "en"
      }
    },
    result: {
      data: {
        primaryShop: shop
      }
    }
  }
];

const router = {
  asPath: "profile/orders"
};

test("basic snapshot of profile menu", () => {
  const component = renderer.create((
    <MockedProvider mocks={mocks} addTypename={false}>
      <ComponentsProvider value={components}>
        <Provider
          authStore={authStore}
        >
          <ProfileMenu
            router={router}
          />
        </Provider>
      </ComponentsProvider>
    </MockedProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
