/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "hooks/useTranslation";

const useStyles = makeStyles(() => ({
  anchor: {
    color: "inherit",
    textDecoration: "none"
  }
}));

/**
 * A wrapper around the next Link component
 *
 * @param {React.node} children - The elements the Link will wrap
 * @param {String} className - Classes to apply
 * @param {String} href - the links destination
 * @param {Boolean} isUrlAbsolute - true if the link is absolute
 * @param {Function} onClick - onClick handler
 * @param {Object} param - route params
 * @param {Object} route - the route object
 * @param {Boolean} shouldOpenInNewWindow - if true link opens in new window
 * @param {String} to - another way to specify the links destination
 * @returns {React.Component} A wrapped link element
 */
function Link({
  children,
  className,
  href,
  isUrlAbsolute,
  onClick,
  params,
  route,
  shouldOpenInNewWindow,
  to,
  as,
  ...props
}) {
  const classes = useStyles();
  const { locale } = useTranslation("common");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.props.onClick(event);
    }
  };

  // If link is an absolute link, or if link should open in new window,
  // then directly us an `a` tag, instead of the `NextLink` component
  if (isUrlAbsolute || shouldOpenInNewWindow) {
    return (
      <a
        className={classNames(classes.anchor, className)}
        href={href}
        onClick={(event) => onClick(event)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        target={shouldOpenInNewWindow ? "_blank" : ""}
      >
        {children}
      </a>
    );
  }

  const linkToUse = useMemo(() => route || to || href, [route, to, href]);

  const hrefWithLocale = useMemo(() => {
    if (linkToUse === "/") return "/[lang]";
    return `/[lang]${linkToUse}`;
  }, [linkToUse, locale]);

  const asWithLocale = useMemo(() => {
    if (linkToUse === "/") return `/${locale}`;
    if (as) return `/${locale}${as}`;
    return `/${locale}${linkToUse}`;
  }, [linkToUse, locale, as]);

  return (
    <NextLink href={hrefWithLocale} as={asWithLocale} {...props} passHref>
      <a
        className={classNames(classes.anchor, className)}
        onClick={(event) => onClick(event)}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
      >
        {children}
      </a>
    </NextLink>
  );
}

Link.defaultProps = {
  isUrlAbsolute: false,
  onClick: () => { },
  shouldOpenInNewWindow: false
};

Link.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  isUrlAbsolute: PropTypes.bool,
  linkItem: PropTypes.object,
  onClick: PropTypes.func,
  params: PropTypes.object,
  route: PropTypes.string,
  shouldOpenInNewWindow: PropTypes.bool,
  to: PropTypes.string
};

export default Link;
