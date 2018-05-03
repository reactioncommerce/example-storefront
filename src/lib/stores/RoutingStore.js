import { action, observable, computed } from "mobx";
import { Router } from "routes";

export default class RoutingStore {
  @observable _pathname = "";
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
