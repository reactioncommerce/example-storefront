import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "material-ui/styles";
import Header from "components/Header";
import Footer from "components/Footer";
import { Cart } from "components/Cart";

const styles = (theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3
  },
  article: {
    padding: "10px"
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
    const { classes: { article, main }, children, title } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className={main}>
          <article className={article}>{children}</article>
        </main>
        <Cart />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
