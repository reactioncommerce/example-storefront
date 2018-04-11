import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { withStyles } from "material-ui/styles";

import withData from "lib/apollo/withData";
import withRoot from "lib/theme/withRoot";
import Layout from "components/Layout";
import { ProductGrid } from "components/ProductGrid";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 0
  }
});

@withData
@withRoot
@withStyles(styles)
@inject("uiStore")
@observer
class Shop extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout title="Welcome home">
        <div className={classes.root}>
          <ProductGrid />
        </div>
      </Layout>
    );
  }
}

export default Shop;
