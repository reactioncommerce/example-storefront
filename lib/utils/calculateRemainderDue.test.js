import calculateRemainderDue from "./calculateRemainderDue";

test("calculates correct remainder", () => {
  const payments = [
    { payment: { amount: 5.55 } }
  ];

  expect(calculateRemainderDue(payments, 10)).toBe(4.45);
});

test("avoids JS math errors", () => {
  const payments = [
    { payment: { amount: 100 } },
    { payment: { amount: 79.99 } }
  ];

  expect(calculateRemainderDue(payments, 179.99)).toBe(0);
});
