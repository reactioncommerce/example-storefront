/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link as NextLink } from "routes";
import { withStyles, withTheme } from "material-ui/styles";

const styles = ({
  link: {
    textDecoration: "none"
  }
});

@withStyles(styles)
@withTheme()
class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes, children, ...props } = this.props;

    return (
      <NextLink {...props}>
        <a className={classes.link}>
          {children}
        </a>
      </NextLink>

    );
  }
}

export default Link;
