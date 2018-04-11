import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";

// TODO: get real products from server
import { tempProducts as products } from "./tempProducts";

class ProductGrid extends Component {
  static propTypes = {};

  static defaultProps = {};

  renderProduct(product) {
    return <Grid item>{product.title}</Grid>;
  }

  render() {
    console.log("product grid", products);
    return (
      <section>
        <Grid container spacing={24}>
          {products.map(this.renderProduct)}
        </Grid>
      </section>
    );
  }
}

export default ProductGrid;
