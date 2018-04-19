import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "material-ui/styles";
import Header from "components/Header";
import Footer from "components/Footer";
import { Cart } from "components/Cart";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    flex: "1 1 auto"
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
    title: PropTypes.string
  };

  static defaultProps = {
    classes: {},
    title: ""
  };

  render() {
    const {
      classes: { article, main, root },
      children,
      title
    } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className={root}>
          <Header />
          <main className={main}>
            <article className={article}>{children}</article>
          </main>
          <Footer />
        </div>
        <Cart />
      </React.Fragment>
    );
  }
}

export default Layout;
