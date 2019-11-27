import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "components/Footer";
import * as styles from "./style";

const muiStyles = (theme) => ({
  templateName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9c27b1",
    width: "100%",
    height: "23px"
  },
  title: {
    fontSize: "11px",
    color: "white"
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

@withStyles(muiStyles, { name: "SkLayout" })
class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };

  render() {
    const { classes, children, shop, viewer } = this.props;

    return (
      <React.Fragment>
        <styles.PageRoot>
          <div className={classes.templateName}>
            <span className={classes.title}>TEMPLATE UNBOX</span>
          </div>
          <Header shop={shop} viewer={viewer} />
          <main className={classes.main}>
            <article className={classes.article}>{children}</article>
          </main>
          <Footer />
        </styles.PageRoot>
      </React.Fragment>
    );
  }
}

export default Layout;
