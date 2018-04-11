import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";

import { ProductItem } from "components/ProductGrid";

// TODO: get real products from server
import { tempProducts } from "./tempProducts";

class ProductGrid extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    products: tempProducts
  };

  renderProduct(product) {
    return (
      <Grid key={product._id} item>
        <ProductItem product={product} />
      </Grid>
    );
  }

  render() {
    const { products } = this.props;
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
