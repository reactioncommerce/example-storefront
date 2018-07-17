import Cookies from "js-cookie";
import { observable, action } from "mobx";

/**
 * A mobx store for cart
 * @class CartStore
 */

class CartStore {
  constructor(name) {
    this.tokenName = name || "token";
  }
  /**
  * The cartId for an anonymous cart
  *
  * @type String
  */
  @observable cartId = "";

  @action setCartId(token) {
    this.token = token || "";
    this.saveCartIdToLocalStorage();
    this.saveCartIdToCookie();
  }

  @action unsetCartId() {
    this.setCartId("");
  }

  saveCartIdToLocalStorage() {
    if (typeof this.token === "string" && this.token.length) {
      localStorage.setItem(this.tokenName, this.token);
    } else {
      localStorage.removeItem(this.tokenName);
    }
  }

  setCartIdFromLocalStorage() {
    const token = localStorage.getItem(this.tokenName);
    this.setCartId(token);
  }

  saveCartIdToCookie() {
    if (typeof this.token === "string" && this.token.length) {
      Cookies.set(this.tokenName, this.token);
    } else {
      Cookies.remove(this.tokenName);
    }
  }

  get hasAnonymousCart() {
    return (this.cartId && this.cartId.length) || false;
  }
}

export default CartStore;
