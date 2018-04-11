import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "material-ui/styles";

import Header from "components/Header";
import { Cart } from "components/Cart";

const styles = (theme) => ({
  main: {
    padding: theme.spacing.unit * 3
  }
});

@withStyles(styles)
class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    title: PropTypes.string
  };

  static defaultProps = {
    classes: {},
    title: ""
  };

  render() {
    const { classes, children, title } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className={classes.main}>{children}</main>
        <Cart />
      </div>
    );
  }
}

export default Layout;
