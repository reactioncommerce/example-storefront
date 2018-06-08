/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link as NextLink } from "routes";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import track from "lib/tracking/track";
import Anchor from "./Anchor.js";

const styles = ({
  link: {
    color: "inherit",
    textDecoration: "none"
  }
});

@withStyles(styles)
@track((ownProps) => ({
  component: "Link",
  url: ownProps.route,
  params: ownProps.params
}))
class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onAnchorClick: PropTypes.func
  }

  static defaultProps = {
    onAnchorClick: () => {}
  }

  render() {
    const {
      classes,
      children,
      className,
      onAnchorClick, // eslint-disable-line
      tracking, // eslint-disable-line
      ...props
    } = this.props;

    return (
      <NextLink {...props} passHref>
        <Anchor
          className={classNames(classes.link, className)}
          onAnchorClick={this.props.onAnchorClick}
        >
          {children}
        </Anchor>
      </NextLink>
    );
  }
}

export default Link;
