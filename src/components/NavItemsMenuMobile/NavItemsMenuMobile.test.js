import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import NavItemsMenuMobile from "./NavItemsMenuMobile";

describe("NavItemsMenuMobile", () => {
  it("Should call handleClose function", () => {
    const mockCallBack = jest.fn();
    const component = shallow(<NavItemsMenuMobile handleClose={mockCallBack} />);
    component.find("#close-menu").simulate("click");
    component.find("#page-link-1").simulate("click");

    expect(mockCallBack.mock.calls.length).toEqual(2);
  });

  it("Should match the snapshot", () => {
    const tree = renderer.create(<NavItemsMenuMobile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
