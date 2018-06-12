import { observable, action } from "mobx";
import Cookies from "js-cookie";

/**
 * A mobx store for authentication
 * @class AuthStore
 */

class AuthStore {
  constructor(name) {
    this.tokenName = name || "token";
  }
  /**
  * The login token of the current user
  *
  * @type String
  */
  @observable token = "";

  @action setToken(token) {
    this.token = token || "";
  }

  @action unsetToken(tokenName) {
    this.token = "";
    Cookies.remove(tokenName);
  }

  saveTokenToCookie() {
    if (typeof this.token === "string" && this.token.length) {
      Cookies.set(this.tokenName, this.token);
    } else {
      Cookies.remove(this.tokenName);
    }
  }

  setTokenFromCookie() {
    const token = Cookies.get(this.tokenName);
    this.setToken(token);
  }
}

export default AuthStore;
