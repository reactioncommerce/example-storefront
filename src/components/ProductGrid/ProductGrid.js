import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";

import ProductItem from "components/ProductItem";

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
    const { _id, weight } = product;
    const gridItemSize = {
      0: {
        xs: 12,
        sm: 4,
        md: 3
      },
      1: {
        xs: 12,
        sm: 8,
        md: 6
      },
      2: {
        xs: 12,
        sm: 12,
        md: 9
      }
    };
    const gridItemProps = {
      key: _id,
      ...gridItemSize[weight]
    };
    return (
      <Grid item {...gridItemProps}>
        <ProductItem product={product} />
      </Grid>
    );
  }

  render() {
    const { products } = this.props;
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
