/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import routes, { Link as NextLink } from "routes";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import track from "lib/tracking/track";
import getConfig from "next/config";

const { publicRuntimeConfig: { enableSPARouting } } = getConfig();

const styles = () => ({
  anchor: {
    color: "inherit",
    textDecoration: "none"
  }
});

@track((ownProps) => ({
  component: "Link",
  url: ownProps.route || ownProps.href,
  params: ownProps.params
}))
@withStyles(styles, { name: "SkLink" })
class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    href: PropTypes.string,
    onClick: PropTypes.func,
    params: PropTypes.object,
    route: PropTypes.string,
    to: PropTypes.string
  }

  static defaultProps = {
    onClick: () => { }
  }

  @track(() => ({
    action: "Link Clicked"
  }))
  handleClick = (event) => {
    this.props.onClick(event);
  }

  @track(() => ({
    action: "Link Enter Key Down"
  }))
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.props.onClick(event);
    }
  }

  render() {
    const {
      children,
      classes,
      className,
      href,
      onClick,
      params,
      route,
      tracking, // eslint-disable-line
      to,
      ...props
    } = this.props;

    if (!enableSPARouting) {
      const { urls: { as } } = routes.findAndGetUrls(route || to || href, params);

      return (
        <a
          href={as}
          className={classNames(classes.anchor, className)}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink route={route || to || href} params={params} {...props} passHref>
        <a
          className={classNames(classes.anchor, className)}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role="link"
          tabIndex={0}
        >
          {children}
        </a>
      </NextLink>
    );
  }
}

export default Link;
