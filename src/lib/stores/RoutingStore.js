import { observable, computed } from "mobx";

/**
 * A mobx store for routing data
 * @class AuthStore
 */

export default class RoutingStore {
  /**
   * `pathname` @observable
   * @type @observable
   * @param {string} pathname - The pathname of the current page (i.e. `/tags/shop`)
   */
  @observable _pathname = "";

  /**
   *`query` @observable
   * @type @observable
   * @param {string} query - The query string of the current page (i.e. `shop`)
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
