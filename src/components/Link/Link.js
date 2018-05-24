/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link as NextLink } from "routes";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import track from "lib/tracking/track";

const styles = ({
  link: {
    color: "inherit",
    textDecoration: "none"
  }
});

@withStyles(styles)
@track({ component: "Link" })
class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  }

  @track((ownProps) => ({
    action: "Link Clicked",
    url: ownProps.route,
    params: ownProps.params
  }))
  trackClick = () => {}

  render() {
    const {
      classes,
      children,
      className,
      tracking, // eslint-disable-line
      ...props
    } = this.props;

    return (
      <NextLink {...props}>
        <a
          className={classNames(classes.link, className)}
          onMouseUp={this.trackClick}
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
