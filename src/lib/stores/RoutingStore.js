import { action, toJS, observable } from "mobx";
import routes, { Router } from "routes";
import { inPageSizes, PAGE_SIZES } from "lib/utils/pageSizes";

/**
 * A mobx store for routing data
 * @class RoutingStore
 */

export default class RoutingStore {
  /**
   * The pathname of the current page (i.e. `/tags/shop`)
   *
   * @type String
   */
  @observable pathname = "";

  /**
   * The path from the response header "Request-Path".
   *
   * @type string
   */
  @observable requestPath = null;

  /**
   * The route, which corresponds to the page template
   *
   * @type string
   */
  @observable route = null;

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
   * The tag ID for the current page.
   * @type String
   */
  @observable tagId = null;

  @action
  setTagId = (tagId) => {
    this.tagId = tagId;
  };

  @action
  updateRoute({ pathname, query, route }) {
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
  @action setRequestPath(path) {
    this.requestPath = path;
  }

  /**
   * Set a new rewrite route for the browser app that resolves to an internal route.
   * This is used to handle rewrite urls from an HTTP proxy by adding a new
   * route so the browser-side app can properly resolve that path to a page.
   * @name setRewriteRoute
   * @param {String} from Path to add a dynamic route for.
   * @param {String} to Internal page route, usually in the form of "/"" for home, "/product", "/tag", etc
   * @returns {undefined} No return value
   */
  setRewriteRoute(from, to) {
    this.setRequestPath(from);

    if (process.browser) {
      // Remove all generated rewrite routes
      const routesWithoutRewrites = routes.routes.filter(({ name }) => (
        name.startsWith("rewrite-") === false
      ));
      routes.routes = routesWithoutRewrites;

      // Add new generated route
      routes.add(`rewrite-${from}`, from, to);
    }
  }

  /**
   * Set a query string for the current route
   * @name setSearch
   * @param {String} search Search query string first=1&after=123
   * @returns {String} full url with query string
   */
  @action
  setSearch(search) {
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
      Router.pushRoute(path, path, { shallow: true, replace: true });
    }

    return path;
  }
}
