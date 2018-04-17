import { observable, computed, action } from "mobx";

/**
 * A mobx store for authentication
 * @class AuthStore
 */
class AuthStore {
  @observable _token = "";

  @computed get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  @action saveToken = () => {
    // Save the token
  }
}

export default AuthStore;
