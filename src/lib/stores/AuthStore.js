import { observable, action } from "mobx";
import Cookies from "js-cookie";

/**
 * A mobx store for authentication
 * @class AuthStore
 */

class AuthStore {
  /**
  * The login token of the current user
  *
  * @type String
  */
  @observable token = "";

  @action setToken(token) {
    this.token = token || "";
  }

  saveTokenToCookie() {
    if (typeof this.token === "string" && this.token.length) {
      Cookies.set("token", this.token);
    } else {
      Cookies.remove("token");
    }
  }

  setTokenFromCookie() {
    const token = Cookies.get("token");
    this.setToken(token);
  }
}

export default AuthStore;
