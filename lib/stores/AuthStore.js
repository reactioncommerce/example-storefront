import { observable, action, decorate } from "mobx";

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
  accountId = null;

  /**
   * The account data of the currently signed-in user
   *
   * @type String
   */
  account = {};

  get isAuthenticated() {
    return !!this.accountId;
  }

  // TODO: Temporary workaround until name fields get added from GQL
  // See https://github.com/reactioncommerce/reaction/issues/4646
  splitNames(account) {
    let firstName = "";
    let lastName = "";
    const { name } = account;
    const nameParts = name && name.split(" ");
    if (Array.isArray(nameParts)) {
      [firstName, lastName] = nameParts;
    }

    return {
      firstName,
      lastName
    };
  }

  setAccount = (account) => {
    if (account) {
      this.accountId = account._id || null;
      this.account = { ...this.splitNames(account), ...account };
    } else {
      this.accountId = null;
      this.account = {};
    }
  }
}

decorate(AuthStore, {
  account: observable,
  accountId: observable,
  setAccount: action
});

export default AuthStore;
