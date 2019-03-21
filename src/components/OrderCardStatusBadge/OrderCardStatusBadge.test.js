import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "custom/reactionTheme";
import OrderCardStatusBadge from "./OrderCardStatusBadge";

const statusCanceled = {
  label: "Canceled",
  status: "coreOrderWorkflow/canceled"
};

const statusNew = {
  label: "New",
  status: "new"
};

const statusProcessing = {
  label: "Processing",
  status: "coreOrderWorkflow/processing"
};

const statusCompleted = {
  label: "Completed",
  status: "coreOrderWorkflow/completed"
};

test("basic snapshot of canceled status", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <OrderCardStatusBadge
        status={statusCanceled}
      />
    </MuiThemeProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("basic snapshot of new status", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <OrderCardStatusBadge
        status={statusNew}
      />
    </MuiThemeProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("basic snapshot of processing status", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <OrderCardStatusBadge
        status={statusProcessing}
      />
    </MuiThemeProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("basic snapshot of completed status", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <OrderCardStatusBadge
        status={statusCompleted}
      />
    </MuiThemeProvider>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
