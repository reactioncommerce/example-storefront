import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Layout from "components/layout";
import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import Header from "components/header";
import Profile from "components/profile";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

@withData
@withRoot
@withStyles(styles)
class Shop extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  render() {
    const { classes } = this.props;

    return(
      <Layout title="Wecome home">
        <div className={classes.root}>
          <Profile />
          <p>Index Page</p>
        </div>
      </Layout>
    );
  }
}

export default Shop;
