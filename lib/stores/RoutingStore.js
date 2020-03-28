import { action, toJS, observable, decorate } from "mobx";
import Router from "next/router";
import { inPageSizes, PAGE_SIZES } from "lib/utils/pageSizes";

/**
 * A mobx store for routing data
 * @class RoutingStore
 */

class RoutingStore {
  /**
   * The pathname of the current page (i.e. `/tags/shop`)
   *
   * @type String
   */
  pathname = "";

  /**
   * The path from the response header "Request-Path".
   *
   * @type string
   */
  requestPath = null;

  /**
   * The route, which corresponds to the page template
   *
   * @type string
   */
  route = null;

  /**
   * The query params for the current page (i.e. `{shop: `1234', first: 24}`)
   *
   * @type Object
   */
  query = {};

  /**
   * The query params as a URL string. (i.e. `sortby=minPrice-asc&limit=60`)
   *
   * @type String
   */
  queryString = "";

  /**
   * The tag ID for the current page.
   * @type String
   */
  tagId = null;

  setTagId = (tagId) => {
    this.tagId = tagId;
  };

  updateRoute = ({ pathname, query, route }) => {
    this.pathname = pathname;
    this.query = query;
    this.route = route;
  }

  /**
   * Set the request path
   * @name setRequestPath
   * @param {String} path Request pathname
   * @returns {undefined} No return value
   */
  setRequestPath = (path) => {
    this.requestPath = path;
  }

  /**
   * Set a query string for the current route
   * @name setSearch
   * @param {String} search Search query string first=1&after=123
   * @returns {String} full url with query string
   */

  setSearch = (search) => {
    const _query = { ...toJS(this.query), ...search };
    const _slug = _query.slug;
    const _limit = parseInt(_query.limit, 10);
    delete _query.slug;

    // Handle deleting query params
    for (const key of Object.keys(_query)) {
      if (_query[key] === null) {
        delete _query[key];
      }
    }

    // Validate limit
    _query.limit = inPageSizes(_limit) ? _limit : PAGE_SIZES._20;
    let urlQueryString = "";
    Object.keys(_query).forEach((key, index, arr) => {
      urlQueryString += `${key}=${_query[key]}`;

      if (index < arr.length - 1) {
        urlQueryString += "&";
      }
    });

    this.queryString = urlQueryString;

    let path;
    if (this.requestPath) {
      path = `${this.requestPath}?${this.queryString}`;
    } else if (_slug) {
      path = `${this.pathname}/${_slug}?${this.queryString}`;
    } else if (process.browser) {
      // allow for path instead of component name in URL
      path = `${window.location.pathname}?${this.queryString}`;
    } else {
      path = `${this.pathname}?${this.queryString}`;
    }

    // Router is only available for the client (browser)
    if (process.browser) {
      // Router.pushRoute(path, path, { shallow: true, replace: true });
    }

    return path;
  };
}

decorate(RoutingStore, {
  pathname: observable,
  requestPath: observable,
  route: observable,
  query: observable,
  queryString: observable,
  tagId: observable,
  setTagId: action,
  updateRoute: action,
  setRequestPath: action,
  setSearch: action
})

export default RoutingStore;
