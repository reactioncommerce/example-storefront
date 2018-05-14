import { action, observable, computed } from "mobx";
import { Router } from "routes";

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
   * The query params for the current page (i.e. `{shop: `1234', first: 24}`)
   *
   * @type Object
   */
  @observable _query = {};

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

  /**
   * Set a query string for the current route
   * @name setSearch
   * @param {String} search Search query string first=1&after=123
   * @returns {String} full url with query string
   */
  @action setSearch(search) {
    const path = `${this._pathname}?${search}`;
    Router.pushRoute(path);
    return path;
  }
}
