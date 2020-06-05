import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import inject from "hocs/inject";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetailAddToCart from "components/ProductDetailAddToCart";
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailVendor from "components/ProductDetailVendor";
import ProductDetailDescription from "components/ProductDetailDescription";
import ProductDetailPrice from "components/ProductDetailPrice";
import MediaGallery from "components/MediaGallery";
import Router from "translations/i18nRouter";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";

const styles = (theme) => ({
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
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
class ProductDetail extends Component {
  static propTypes = {
    /**
     * Function to add items to a cart.
     * Implementation may be provided by addItemsToCart function from the @withCart decorator
     *
     * @example addItemsToCart(CartItemInput)
     * @type Function
     */
    addItemsToCart: PropTypes.func,
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    product: PropTypes.object,
    routingStore: PropTypes.object.isRequired,
    shop: PropTypes.object.isRequired,
    theme: PropTypes.object,
    uiStore: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { product } = this.props;

    // Select first variant by default
    this.selectVariant(product.variants[0]);
  }

  selectVariant(variant, optionId) {
    const { product, uiStore } = this.props;

    // Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }

    uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

    Router.replace("/product/[...slugOrId]", `/product/${product.slug}/${selectOptionId || variantId}`);
  }

  /**
   * @name handleSelectVariant
   * @summary Called when a variant is selected in the variant list
   * @private
   * @ignore
   * @param {Object} variant The variant object that was selected
   * @returns {undefined} No return
   */
  handleSelectVariant = (variant) => {
    this.selectVariant(variant);
  };

  /**
   * @name handleAddToCartClick
   * @summary Called when the add to cart button is clicked
   * @private
   * @ignore
   * @param {Number} quantity - A positive integer from 0 to infinity, representing the quantity to add to cart
   * @returns {undefined} No return
   */
  handleAddToCartClick = async (quantity) => {
    const {
      addItemsToCart,
      currencyCode,
      product,
      uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
      width
    } = this.props;

    // Get selected variant or variant option
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
    const selectedVariantOrOption = selectedOption || selectedVariant;

    if (selectedVariantOrOption) {
      // Get the price for the currently selected variant or variant option
      const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

      // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
      await addItemsToCart([
        {
          price: {
            amount: price.price,
            currencyCode
          },
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with _id
          },
          quantity
        }
      ]);
    }
    if (isWidthUp("md", width)) {
      // Open the cart, and close after a 3 second delay
      openCartWithTimeout(3000);
    }
  };

  /**
   * @name handleSelectOption
   * @summary Called when an option is selected in the option list
   * @private
   * @ignore
   * @param {Object} option The option object that was selected
   * @returns {undefined} No return
   */
  handleSelectOption = (option) => {
    const { product, uiStore } = this.props;

    // If we are clicking an option, it must be for the current selected variant
    const variant = product.variants.find((vnt) => vnt._id === uiStore.pdpSelectedVariantId);

    this.selectVariant(variant, option._id);
  };

  /**
   * @name determineProductPrice
   * @description Determines a product's price given the shop's currency code. It will
   * use the selected option if available, otherwise it will use the selected variant.
   * @returns {Object} An pricing object
   */
  determineProductPrice() {
    const { currencyCode, product } = this.props;
    const { pdpSelectedVariantId, pdpSelectedOptionId } = this.props.uiStore;
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    let productPrice = {};

    if (pdpSelectedOptionId && selectedVariant) {
      const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
      productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
    } else if (!pdpSelectedOptionId && selectedVariant) {
      productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
    }

    return productPrice;
  }

  render() {
    const {
      classes,
      currencyCode,
      product,
      routingStore,
      uiStore: { pdpSelectedOptionId, pdpSelectedVariantId },
      width
    } = this.props;

    // Set the default media as the top-level product's media
    // (all media on all variants and objects)
    let pdpMediaItems = product.media;

    // If we have a selected variant (we always should)
    // check to see if media is available, and use this media instead
    // Revert to original media if variant doesn't have specific media
    const selectedVariant = product.variants.find((variant) => variant._id === pdpSelectedVariantId);
    if (selectedVariant) {
      if (selectedVariant.media && selectedVariant.media.length) {
        pdpMediaItems = selectedVariant.media;
      }

      // If we have a selected option, do the same check
      // Will revert to variant check if no option media is available
      if (Array.isArray(selectedVariant.options) && selectedVariant.options.length) {
        const selectedOption = selectedVariant.options.find((option) => option._id === pdpSelectedOptionId);
        if (selectedOption) {
          if (selectedOption.media && selectedOption.media.length) {
            pdpMediaItems = selectedOption.media;
          }
        }
      }
    }

    const productPrice = this.determineProductPrice();
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
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              currencyCode={currencyCode}
              variants={product.variants}
            />
            <ProductDetailAddToCart
              onClick={this.handleAddToCartClick}
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
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              currencyCode={currencyCode}
              variants={product.variants}
            />
            <ProductDetailAddToCart
              onClick={this.handleAddToCartClick}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              variants={product.variants}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withWidth({ initialWidth: "md" })(withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(ProductDetail)));
