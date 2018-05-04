import { observable, computed } from "mobx";

/**
 * A mobx store for routing data
 * @class AuthStore
 */

export default class RoutingStore {
  /**
   * The pathname of the current page (i.e. `/tags/shop`)
   *
   * @type String
   */
  @observable _pathname = "";

  /**
   * The query string of the current page (i.e. `shop`)
   *
   * @type @observable
   */
  @observable _query = "";

  @computed
  get pathname() {
    return this._pathname;
  }

  set pathname(value) {
    this._pathname = value;
  }

  @computed
  get query() {
    return this._query;
  }

  set query(value) {
    this._query = value;
  }
}
