import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import PageLoading from "components/PageLoading";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import ProductGridEmptyMessage from "./ProductGridEmptyMessage";

const styles = (theme) => ({
  filters: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  }
});

class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    isLoadingCatalogItems: PropTypes.bool,
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    }),
    pageSize: PropTypes.number.isRequired,
    setPageSize: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
  };

  renderFilters() {
    const { classes, pageSize, setPageSize, setSortBy, sortBy } = this.props;

    return (
      <Grid container spacing={1} className={classes.filters}>
        <Grid item>
          <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
        </Grid>
        <Grid item>
          <SortBySelector sortBy={sortBy} onChange={setSortBy} />
        </Grid>
      </Grid>
    );
  }

  renderMainArea() {
    const { catalogItems, isLoadingCatalogItems, pageInfo } = this.props;

    if (isLoadingCatalogItems) return <PageLoading />;

    const products = (catalogItems || []).map((item) => item.node.product);
    if (products.length === 0) return <ProductGridEmptyMessage />;

    return (
      <Fragment>
        <Grid container spacing={3}>
          <CatalogGrid
            products={products}
            placeholderImageURL="/images/placeholder.gif"
            {...this.props}
          />
        </Grid>
        {pageInfo && <PageStepper pageInfo={pageInfo} />}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderFilters()}
        {this.renderMainArea()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ProductGrid);
