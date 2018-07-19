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
   * The anonymousCartId for an anonymous cart
   *
   * @type String
   */
  @observable anonymousCartId = null;

  /**
   * The anonymousCartId for an anonymous cart
   *
   * @type String
   */
  @observable anonymousCartToken = null;

  /**
   * @name setAnonymousCartCredentials
   * @summary Set cartID and anonymousCartToken to local storage and cookies
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
   * @name hasAnonymousCart
   * @summary Return a boolean is the credentials for an anonymous cart exists
   * @returns {Boolean} Boolean true if credentials for an anonymous cart exists
   */
  get hasAnonymousCart() {
    return (this.anonymousCartId && this.anonymousCartToken) || false;
  }
}

export default CartStore;
