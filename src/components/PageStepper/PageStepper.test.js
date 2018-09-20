import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Button from "@reactioncommerce/components/Button/v1";
import PageStepper from "./PageStepper";

test("shows next button, hides previous button", () => {
  const pageInfo = {
    hasNextPage: true,
    hasPreviousPage: false
  };

  const component = renderer.create(<PageStepper pageInfo={pageInfo} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("hides next button, shows previous button", () => {
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: true
  };

  const component = renderer.create(<PageStepper pageInfo={pageInfo} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("shows both next and previous buttons", () => {
  const pageInfo = {
    hasNextPage: true,
    hasPreviousPage: true
  };

  const component = renderer.create(<PageStepper pageInfo={pageInfo} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("click next button", () => {
  const pageInfo = {
    hasNextPage: true,
    loadNextPage: jest.fn()
  };

  const wrapper = mount(<PageStepper pageInfo={pageInfo} />);

  const buttonElement = wrapper.find(Button);
  expect(buttonElement.length).toBe(1);
  buttonElement.simulate("click");
  expect(pageInfo.loadNextPage).toHaveBeenCalled();
});

test("click previous button", () => {
  const pageInfo = {
    hasPreviousPage: true,
    loadPreviousPage: jest.fn()
  };

  const wrapper = mount(<PageStepper pageInfo={pageInfo} />);

  const buttonElement = wrapper.find(Button);
  expect(buttonElement.length).toBe(1);
  buttonElement.simulate("click");
  expect(pageInfo.loadPreviousPage).toHaveBeenCalled();
});
