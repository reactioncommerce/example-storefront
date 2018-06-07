import { action, toJS, observable } from "mobx";
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
  @observable pathname = "";

  /**
   * The query params for the current page (i.e. `{shop: `1234', first: 24}`)
   *
   * @type Object
   */
  @observable query = {};

  /**
   * The query params as a URL string. (i.e. `sortby=minPrice-asc&limit=60`)
   *
   * @type String
   */
  @observable queryString = "";

  /**
   * The tag for the current page.
   * @type Object
   */
  @observable tag = {};

  @action setTag = (tag) => {
    this.tag = tag;
  }

  @action updateRoute({ pathname, query }) {
    this.pathname = pathname;
    this.query = query;
  }

  /**
   * Set a query string for the current route
   * @name setSearch
   * @param {String} search Search query string first=1&after=123
   * @returns {String} full url with query string
   */
  @action setSearch(search) {
    const _query = { ...toJS(this.query), ...search };
    const _slug = _query.slug;
    delete _query.slug;
    let urlQueryString = "";
    Object.keys(_query).forEach((key, index, arr) => {
      urlQueryString += `${key}=${_query[key]}`;

      if (index < arr.length - 1) {
        urlQueryString += "&";
      }
    });

    this.queryString = urlQueryString;

    let path;
    if (_slug) {
      path = `${this.pathname}/${_slug}?${this.queryString}`;
    } else {
      path = `${this.pathname}?${this.queryString}`;
    }

    Router.replaceRoute(path, path, { shallow: true });
    return path;
  }
}
