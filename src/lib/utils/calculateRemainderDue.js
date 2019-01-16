/**
 * @summary Given an array of payments and a total amount due, calculates
 *   how much is still due.
 * @param {Object[]} payments Array of PaymentInput objects
 * @param {Number} totalDue Total due
 * @returns {Number} remainder due
 */
export default function calculateRemainderDue(payments, totalDue) {
  const remainingAmountDue = payments.reduce((val, { payment }) => val - (payment.amount || val), totalDue);
  // This is an attempt to foil JS floating point math rounding errors. Not sure if this will
  // fix every potential issue, but it fixes the one we have a test for. Basically we are
  // keeping only three decimal places precision, which is the most any currency has.
  return Math.round(remainingAmountDue * 1000) / 1000;
}
