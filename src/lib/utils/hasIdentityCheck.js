/**
 *
 * @method hasidentitycheck
 * @summary
 * @param {Object} cart - customer cart object
 * @return {Boolean} - if the customer is signed in or has a guest email set return true else false.
 */
const hasIdentityCheck = (cart) => !!((cart && cart.account !== null) || (cart && cart.email));

export default hasIdentityCheck;
