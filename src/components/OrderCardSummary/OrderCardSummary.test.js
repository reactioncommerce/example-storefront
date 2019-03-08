import React from "react";
import renderer from "react-test-renderer";
import OrderCardSummary from "./OrderCardSummary";

const summary = {
  fulfillmentTotal: { amount: 2.99, displayAmount: "$2.99" },
  itemTotal: { amount: 6000, displayAmount: "$6,000.00" },
  surchargeTotal: { amount: 0, displayAmount: "$0.00" },
  taxTotal: { amount: 0, displayAmount: "$0.00" },
  total: { amount: 6002.99, displayAmount: "$6,002.99" }
};

test("basic snapshot of an order summary", () => {
  const component = renderer.create((
    <OrderCardSummary
      summary={summary}
    />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
