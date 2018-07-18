import Cookies from "js-cookie";
import { observable, action } from "mobx";

/**
 * A MobX store for cart
 * @class CartStore
 */
class CartStore {
  CART_ID_KEY_NAME = "cartId";
  CART_TOKEN_KEY_NAME = "cartToken";

  /**
   * The cartId for an anonymous cart
   *
   * @type String
   */
  @observable cartId = null;

  /**
   * The cartId for an anonymous cart
   *
   * @type String
   */
  @observable token = null;

  /**
   * @name setAnonymousCartCredentials
   * @summary Set cartID and token to local storage and cookies
   * @param {String} cartId Cart Id from "createCart" mutation
   * @param {String} token  Token from "createCart" mutation
   * @returns {undefined} No return
   */
  @action setAnonymousCartCredentials(cartId, token) {
    this.cartId = cartId || null;
    this.token = token || null;

    if (typeof this.cartId === "string" && this.cartId.length) {
      // Save to local storage
      localStorage.setItem(this.CART_ID_KEY_NAME, this.cartId);
      localStorage.setItem(this.CART_TOKEN_KEY_NAME, this.token);

      // Save cookies
      Cookies.set(this.CART_ID_KEY_NAME, this.cartId);
      Cookies.set(this.CART_TOKEN_KEY_NAME, this.token);
    } else {
      // Remove from local storage
      localStorage.removeItem(this.CART_ID_KEY_NAME);
      localStorage.removeItem(this.CART_TOKEN_KEY_NAME);

      // Remove cookies
      Cookies.remove(this.CART_ID_KEY_NAME);
      Cookies.remove(this.CART_TOKEN_KEY_NAME);
    }
  }

  /**
   * @name setAnonymousCartCredentialsFromLocalStorage
   * @summary Set into class properties from local storage
   * @returns {undefined} No return
   */
  setAnonymousCartCredentialsFromLocalStorage() {
    const cartId = localStorage.getItem(this.CART_ID_KEY_NAME);
    const token = localStorage.getItem(this.CART_TOKEN_KEY_NAME);

    // Call to set, and ensure all credentials are the same in
    // local storage, cookies, and class properties
    this.setAnonymousCartCredentials(cartId, token);
  }

  /**
   * @name hasAnonymousCart
   * @summary Return a boolean is the credentials for an anonymous cart exists
   * @returns {Boolean} Boolean true if credentials for an anonymous cart exists
   */
  get hasAnonymousCart() {
    return (this.cartId && this.token) || false;
  }
}

export default CartStore;
