import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import track from "lib/tracking/track";
import trackProductClicked from "lib/tracking/trackProductClicked";
import PageLoading from "components/PageLoading";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import ProductGridEmptyMessage from "./ProductGridEmptyMessage";

const styles = (theme) => ({
  filters: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing.unit * 2
  }
});

@withStyles(styles, { name: "SkProductGrid" })
@track()
export default class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    initialSize: PropTypes.object,
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
      <Grid container spacing={8} className={classes.filters}>
        <Grid item>
          <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
        </Grid>
        <Grid item>
          <SortBySelector sortBy={sortBy} onChange={setSortBy} />
        </Grid>
      </Grid>
    );
  }

  @trackProductClicked()
  onItemClick = (event, product) => {} // eslint-disable-line no-unused-vars

  renderMainArea() {
    const { catalogItems, initialSize, isLoadingCatalogItems, pageInfo } = this.props;

    if (isLoadingCatalogItems) return <PageLoading />;

    const products = (catalogItems || []).map((item) => item.node.product);
    if (products.length === 0) return <ProductGridEmptyMessage />;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <CatalogGrid
            initialSize={initialSize}
            onItemClick={this.onItemClick}
            products={products}
            placeholderImageURL="/static/images/placeholder.gif"
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
