import { observable, action } from "mobx";

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
    localStorage.removeItem(tokenName);
  }

  saveTokenToLocalStorage() {
    if (typeof this.token === "string" && this.token.length) {
      localStorage.setItem(this.tokenName, this.token);
    } else {
      localStorage.removeItem(this.tokenName);
    }
  }

  setTokenFromLocalStorage() {
    const token = localStorage.getItem(this.tokenName);
    this.setToken(token);
  }
}

export default AuthStore;
