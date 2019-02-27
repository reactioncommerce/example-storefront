import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
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

const router = {
  asPath: "profile/orders"
};

test("basic snapshot of profile menu", () => {
  const component = renderer.create((
    <Provider
      authStore={authStore}
    >
      <ProfileMenu
        router={router}
      />
    </Provider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
