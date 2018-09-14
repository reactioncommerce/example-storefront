import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "components/Footer";

const styles = (theme) => theme.Layout;

@withStyles(styles)
class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    classes: {}
  };

  render() {
    const { classes, children, shop } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Header shop={shop} />
          <main className={classes.main}>
            <article className={classes.article}>{children}</article>
          </main>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
