import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ProductItem from "components/ProductItem";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";

const styles = () => ({
  productGridContainer: {
    maxWidth: "1440px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  pageSizeContainer: {
    justifyContent: "flex-end"
  }
});

@withStyles(styles)
export default class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    })
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

  renderPageSizeSelector() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24} className={classes.pageSizeContainer}>
        <Grid item>
          <PageSizeSelector />
        </Grid>
      </Grid>
    );
  }

  render() {
    const { catalogItems, classes, pageInfo } = this.props;

    if (!catalogItems) return null;

    return (
      <section className={classes.productGridContainer}>
        {this.renderPageSizeSelector()}
        <Grid container spacing={24}>
          {(catalogItems && catalogItems.length) ? catalogItems.map(this.renderProduct) : null}
        </Grid>

        { pageInfo && <PageStepper pageInfo={pageInfo} /> }
      </section>
    );
  }
}
