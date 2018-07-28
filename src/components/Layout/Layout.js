import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "components/Footer";
import { Cart } from "components/Cart";

const styles = (theme) => ({
  root: {
    minHeight: "100vh"
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainContentMaxWidth,
    marginLeft: "auto",
    marginRight: "auto"
  },
  article: {
    padding: theme.spacing.unit * 3
  }
});

@withStyles(styles)
class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    title: PropTypes.string
  };

  static defaultProps = {
    classes: {},
    title: ""
  };

  render() {
    const { classes, children, shop, title } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className={classes.root}>
          <Header shop={shop} />
          <main className={classes.main}>
            <article className={classes.article}>{children}</article>
          </main>
          <Footer />
        </div>
        <Cart />
      </React.Fragment>
    );
  }
}

export default Layout;
