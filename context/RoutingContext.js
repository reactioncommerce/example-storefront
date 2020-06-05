import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export const RoutingContext = createContext();

export const RoutingProvider = ({ children }) => {
  const [currentAsPath, setCurrentAsPath] = useState();
  const [currentRoute, setCurrentRoute] = useState();
  const [prevAsPath, setPrevAsPath] = useState();
  const [queryString, setQueryString] = useState(""); // eslint-disable-line no-unused-vars

  const { asPath, route, query, pathname } = useRouter();

  const [tagId, setTagId] = useState();

  // We need asPath to have all details, but only change when route changes
  useEffect(() => {
    if (route !== currentRoute) {
      setPrevAsPath(currentAsPath);
      setCurrentAsPath(asPath);
      setCurrentRoute(route);
    }
  }, [route, currentRoute, asPath]);

  const setSearch = (search) => { // eslint-disable-line no-unused-vars
    /*
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
      // Router.push(path, path, { shallow: true, replace: true });
    }

    return path;
    */
  };

  return (
    <RoutingContext.Provider value={{
      queryString,
      tagId,
      prevAsPath,
      setTagId,
      setSearch,
      query,
      route,
      pathname
    }}
    >
      {children}
    </RoutingContext.Provider>
  );
};

RoutingProvider.propTypes = {
  children: PropTypes.node
};
