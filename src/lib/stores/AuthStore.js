import { observable, computed, action } from "mobx";
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
  @observable _token = "";

  @computed get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  @action saveToken = () => {
    // Save the token
    Cookies.set("token", this.token);
  }

  fetchAuthToken() {
    const token = Cookies.get("token");
    this.token = token || "";
    return token;
  }
}

export default AuthStore;
