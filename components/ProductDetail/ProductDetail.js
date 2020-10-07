import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { isWidthDown } from "@material-ui/core/withWidth";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetailAddToCart from "components/ProductDetailAddToCart";
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailVendor from "components/ProductDetailVendor";
import ProductDetailDescription from "components/ProductDetailDescription";
import ProductDetailPrice from "components/ProductDetailPrice";
import MediaGallery from "components/MediaGallery";
import useProductDetail from "hooks/products/useProductDetail";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2)
  },
  breadcrumbGrid: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  info: {
    marginBottom: theme.spacing()
  }
}));

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
const ProductDetail = (props) => {
  const {
    selectVariant,
    determineProductPrice,
    handleAddToCartClick,
    width,
    uiStore,
    routingStore,
    currencyCode,
    product,
    pdpMediaItems
  } = useProductDetail(props);

  const classes = useStyles();
  const { pdpSelectedOptionId, pdpSelectedVariantId } = uiStore;

  useEffect(() => {
    selectVariant(product.variants[0]);
  }, []);

  // Called when a variant is selected in the variant list
  const handleSelectVariant = (variant) => {
    selectVariant(variant);
  };

  // Called when an option is selected in the option list
  const handleSelectOption = (option) => {
    // If we are clicking an option, it must be for the current selected variant
    const variant = product.variants.find((vnt) => vnt._id === uiStore.pdpSelectedVariantId);
    selectVariant(variant, option._id);
  };

  const productPrice = determineProductPrice();
  const compareAtDisplayPrice = (productPrice.compareAtPrice && productPrice.compareAtPrice.displayAmount) || null;


  // Phone size
  if (isWidthDown("sm", width)) {
    return (
      <Fragment>
        <div className={classes.section}>
          <ProductDetailTitle pageTitle={product.pageTitle} title={product.title} />
          <div className={classes.info}>
            <ProductDetailVendor>{product.vendor}</ProductDetailVendor>
          </div>
          <div className={classes.info}>
            <ProductDetailPrice compareAtPrice={compareAtDisplayPrice} isCompact price={productPrice.displayPrice} />
          </div>
        </div>

        <div className={classes.section}>
          <MediaGallery mediaItems={pdpMediaItems} />
        </div>

        <div className={classes.section}>
          <VariantList
            onSelectOption={handleSelectOption}
            onSelectVariant={handleSelectVariant}
            product={product}
            selectedOptionId={pdpSelectedOptionId}
            selectedVariantId={pdpSelectedVariantId}
            currencyCode={currencyCode}
            variants={product.variants}
          />
          <ProductDetailAddToCart
            onClick={handleAddToCartClick}
            selectedOptionId={pdpSelectedOptionId}
            selectedVariantId={pdpSelectedVariantId}
            variants={product.variants}
          />
        </div>

        <div className={classes.section}>
          <ProductDetailDescription>{product.description}</ProductDetailDescription>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Grid container spacing={5}>
        <Grid item className={classes.breadcrumbGrid} xs={12}>
          <Breadcrumbs isPDP tagId={routingStore.tagId} product={product} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.section}>
            <MediaGallery mediaItems={pdpMediaItems} />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ProductDetailTitle pageTitle={product.pageTitle} title={product.title} />
          <div className={classes.info}>
            <ProductDetailVendor>{product.vendor}</ProductDetailVendor>
          </div>
          <div className={classes.info}>
            <ProductDetailPrice className={classes.bottomMargin} compareAtPrice={compareAtDisplayPrice} price={productPrice.displayPrice} />
          </div>
          <div className={classes.info}>
            <ProductDetailDescription>{product.description}</ProductDetailDescription>
          </div>
          <VariantList
            onSelectOption={handleSelectOption}
            onSelectVariant={handleSelectVariant}
            product={product}
            selectedOptionId={pdpSelectedOptionId}
            selectedVariantId={pdpSelectedVariantId}
            currencyCode={currencyCode}
            variants={product.variants}
          />
          <ProductDetailAddToCart
            onClick={handleAddToCartClick}
            selectedOptionId={pdpSelectedOptionId}
            selectedVariantId={pdpSelectedVariantId}
            variants={product.variants}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

ProductDetail.propTypes = {
  addItemsToCart: PropTypes.func,
  currencyCode: PropTypes.string.isRequired,
  product: PropTypes.object,
  shop: PropTypes.object.isRequired
};

export default (ProductDetail);
