import Cookies from "js-cookie";
import { observable, action } from "mobx";

/**
 * A MobX store for cart
 * @class CartStore
 */
class CartStore {
  ANONYMOUS_CART_ID_KEY_NAME = "anonymousCartId";
  ANONYMOUS_CART_TOKEN_KEY_NAME = "anonymousCartToken";

  /**
   * The cart id for an anonymous cart
   *
   * @type String
   */
  @observable anonymousCartId = null;

  /**
   * The token for an anonymous cart
   *
   * @type String
   */
  @observable anonymousCartToken = null;

  /**
   * The cart id for an account cart
   *
   * @type String
   */
  @observable accountCartId = null;

  /**
   * Is the cart currently in the process of being reconciled
   *
   * @type Boolean
   */
  @observable isReconcilingCarts = false;

  /**
   * Payment data from the payment action during checkout
   *
   * @type Object[]
   */
  @observable checkoutPayments = [];

  /**
   * @name setAnonymousCartCredentials
   * @summary Set anonymousCartID and anonymousCartToken to local storage and cookies
   * @param {String} anonymousCartId Cart Id from "createCart" mutation
   * @param {String} anonymousCartToken  Token from "createCart" mutation
   * @returns {undefined} No return
   */
  @action setAnonymousCartCredentials(anonymousCartId, anonymousCartToken) {
    this.anonymousCartId = anonymousCartId || null;
    this.anonymousCartToken = anonymousCartToken || null;

    if (typeof this.anonymousCartId === "string" && this.anonymousCartId.length) {
      // Save to local storage
      localStorage.setItem(this.ANONYMOUS_CART_ID_KEY_NAME, this.anonymousCartId);
      localStorage.setItem(this.ANONYMOUS_CART_TOKEN_KEY_NAME, this.anonymousCartToken);

      // Save cookies
      Cookies.set(this.ANONYMOUS_CART_ID_KEY_NAME, this.anonymousCartId);
      Cookies.set(this.ANONYMOUS_CART_TOKEN_KEY_NAME, this.anonymousCartToken);
    } else {
      // Remove from local storage
      localStorage.removeItem(this.ANONYMOUS_CART_ID_KEY_NAME);
      localStorage.removeItem(this.ANONYMOUS_CART_TOKEN_KEY_NAME);

      // Remove cookies
      Cookies.remove(this.ANONYMOUS_CART_ID_KEY_NAME);
      Cookies.remove(this.ANONYMOUS_CART_TOKEN_KEY_NAME);
    }
  }

  /**
   * @name clearAnonymousCartCredentials
   * @summary Remove anonymousCartId and anonymousCartToken from local storage and cookies
   * @returns {undefined} No return
   */
  @action clearAnonymousCartCredentials() {
    this.setAnonymousCartCredentials(null, null);
  }

  /**
   * @name setAnonymousCartCredentialsFromLocalStorage
   * @summary Set into class properties from local storage
   * @returns {undefined} No return
   */
  setAnonymousCartCredentialsFromLocalStorage() {
    const anonymousCartId = localStorage.getItem(this.ANONYMOUS_CART_ID_KEY_NAME);
    const anonymousCartToken = localStorage.getItem(this.ANONYMOUS_CART_TOKEN_KEY_NAME);

    // Call to set, and ensure all credentials are the same in
    // local storage, cookies, and class properties
    this.setAnonymousCartCredentials(anonymousCartId, anonymousCartToken);
  }

  /**
   * @name setIsReconcilingCarts
   * @summary Set the value of isReconcilingCarts
   * @param {Boolean} value true/false
   * @returns {undefined} No return
   */
  @action setIsReconcilingCarts(value) {
    this.isReconcilingCarts = value;
  }

  /**
   * @name hasAnonymousCartCredentials
   * @summary Return a boolean is the credentials for an anonymous cart exists
   * @returns {Boolean} Boolean true if credentials for an anonymous cart exists
   */
  get hasAnonymousCartCredentials() {
    return (this.anonymousCartId && this.anonymousCartToken) || false;
  }

  get hasAccountCart() {
    return typeof this.accountCartId === "string";
  }

  @action setAccountCartId(value) {
    this.accountCartId = value;
  }

  @action addCheckoutPayment(value) {
    this.checkoutPayments.push(value);
  }

  @action resetCheckoutPayments() {
    this.checkoutPayments = [];
  }
}

export default CartStore;
