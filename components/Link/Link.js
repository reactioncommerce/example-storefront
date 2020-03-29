/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "hooks/useTranslation";

const useStyles = makeStyles((theme) => ({
  anchor: {
    color: "inherit",
    textDecoration: "none"
  }
}));

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
  }

  // If link is an absolute link, or if link should open in new window,
  // then directly us an `a` tag, insted of the `NextLink` component
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
    if (linkToUse === "/") return `/[lang]`;
    return `/[lang]${linkToUse}`;
  }, [linkToUse, locale]);

  const asWithLocale = useMemo(() => {
    if (linkToUse === "/") return `/${locale}`;
    if (as) return `/${locale}${as}`; 
    return `/${locale}${linkToUse}`; 
  }, [linkToUse, locale, as]);

  console.log("hrefWithLocale", hrefWithLocale);
  console.log("asWithLocale", asWithLocale);

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
}

Link.propTypes = {
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
}

export default Link;
