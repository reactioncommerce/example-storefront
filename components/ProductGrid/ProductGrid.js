/* eslint-disable react/no-multi-comp */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import PageLoading from "components/PageLoading";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import useTrackerEvents from "hooks/analytics/useTrackerEvents";
import ProductGridEmptyMessage from "./ProductGridEmptyMessage";

const useStyles = makeStyles((theme) => ({
  filters: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  }
}));

const ProductGrid = (props) => {
  const classes = useStyles();
  const {
    pageSize,
    setPageSize,
    setSortBy,
    sortBy,
    catalogItems,
    isLoadingCatalogItems,
    pageInfo
  } = props;

  const { trackProductClickedEvent } = useTrackerEvents();

  const renderFilters = () => (
    <Grid container spacing={1} className={classes.filters}>
      <Grid item>
        <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
      </Grid>
      <Grid item>
        <SortBySelector sortBy={sortBy} onChange={setSortBy} />
      </Grid>
    </Grid>
  );

  const renderMainArea = () => {
    if (isLoadingCatalogItems) return <PageLoading />;

    const products = (catalogItems || []).map((item) => item.node.product);
    if (products.length === 0) return <ProductGridEmptyMessage />;

    return (
      <Fragment>
        <Grid container spacing={3}>
          <CatalogGrid
            products={products}
            // TODO: onItemClick is ignored because React doesn't recognize it as a custom prop
            // reactjs.org/warnings/unknown-prop.html
            onItemClick={(event, product) => {
              event.preventDefault();
              trackProductClickedEvent({ product });
            }}
            placeholderImageURL="/images/placeholder.gif"
            {...props}
          />
        </Grid>
        {pageInfo && <PageStepper pageInfo={pageInfo} />}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {renderFilters()}
      {renderMainArea()}
    </Fragment>
  );
};

ProductGrid.propTypes = {
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

export default ProductGrid;
