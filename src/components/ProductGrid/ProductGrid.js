import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

import ProductItem from "components/ProductItem";

const styles = () => ({
  productGridContainer: {
    maxWidth: "1440px",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

@withStyles(styles)
export default class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object
  };

  renderProduct(edge) {
    const { node: { product } } = edge;
    const { _id } = product;
    const gridItemProps = {
      key: _id,
      xs: 12,
      sm: 4,
      md: 3
    };
    return (
      <Grid item {...gridItemProps}>
        <ProductItem product={product} />
      </Grid>
    );
  }

  render() {
    const { catalogItems, classes } = this.props;

    return (
      <section className={classes.productGridContainer}>
        <Grid container spacing={24}>
          {(catalogItems && catalogItems.length) ? catalogItems.map(this.renderProduct) : null}
        </Grid>
      </section>
    );
  }
}
