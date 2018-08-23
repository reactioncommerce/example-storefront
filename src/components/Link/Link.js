/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link as NextLink } from "routes";
import classNames from "classnames";
import track from "lib/tracking/track";

@track((ownProps) => ({
  component: "Link",
  url: ownProps.route || ownProps.href,
  params: ownProps.params
}))
class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
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
      className,
      tracking, // eslint-disable-line
      onClick,
      ...props
    } = this.props;

    return (
      <NextLink route={props.route || props.href} {...props} passHref>
        <a
          className={classNames(className)}
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
