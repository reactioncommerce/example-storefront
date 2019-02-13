import React from "react";
import renderer from "react-test-renderer";
// import { shallow } from "enzyme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { MuiThemeProvider } from "@material-ui/core/styles";
import mockComponents from "../../../tests/mockComponents";
// import realComponents from "../../../tests/realComponents";
// import theme from "custom/reactionTheme";
import ProfileAddressBook from "./ProfileAddressBook";


const authStore = {
  account: {
    addressBook: [
      {
        address1: "123 Main Street",
        address2: null,
        city: "Santa Monica",
        company: null,
        country: "US",
        fullName: "Jane Doe",
        isBillingDefault: null,
        isCommercial: false,
        isShippingDefault: null,
        phone: "3105556789",
        postal: "90405",
        region: "CA"
      },
      {
        address1: "123 Broadway",
        address2: null,
        city: "New York",
        company: null,
        country: "US",
        fullName: "Jane Doe",
        isBillingDefault: null,
        isCommercial: false,
        isShippingDefault: null,
        phone: "2125556789",
        postal: "10001",
        region: "NY"
      }
    ]
  }
};

test("basic snapshot", () => {
  const component = renderer.create((
    <ComponentsProvider value={mockComponents}>
      <MuiThemeProvider theme={theme}>
        <ProfileAddressBook
          authStore={authStore}
        />
      </MuiThemeProvider>
    </ComponentsProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
