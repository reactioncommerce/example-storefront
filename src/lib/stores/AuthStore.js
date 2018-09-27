import Cookies from "js-cookie";
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
   * The accountId of the currently signed-in user
   *
   * @type String
   */
  @observable accountId = null;

  /**
   * The account data of the currently signed-in user
   *
   * @type String
   */
  @observable account = {};

  /**
   * The login token of the current user
   *
   * @type String
   */
  @observable token = "";

  @action setToken(token) {
    this.token = token || "";
    this.saveTokenToLocalStorage();
    this.saveTokenToCookie();
  }

  @action unsetToken() {
    this.setToken("");
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

  saveTokenToCookie() {
    if (typeof this.token === "string" && this.token.length) {
      Cookies.set(this.tokenName, this.token);
    } else {
      Cookies.remove(this.tokenName);
    }
  }

  get isAuthenticated() {
    if (this.accountId) {
      return true;
    }

    return false;
  }

  // TODO: Temporary workaround until name fields get added from GQL
  // See https://github.com/reactioncommerce/reaction/issues/4646
  splitNames(account) {
    const { name } = account;
    const [firstName, lastName] = name.split(" ");

    return {
      firstName,
      lastName
    };
  }

  @action setAccount(account) {
    this.accountId = account._id || null;
    this.account = { ...this.splitNames(account), ...account };
  }
}

export default AuthStore;
