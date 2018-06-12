import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import trackProductViewed from "lib/tracking/trackProductViewed";
import track from "lib/tracking/track";
import getVariantTrackingData from "lib/tracking/utils/getVariantTrackingData";
import ProductDetailAddToCart from "components/ProductDetailAddToCart";
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailInfo from "components/ProductDetailInfo";
import MediaGallery from "components/MediaGallery";
import TagGrid from "components/TagGrid";
import { Router } from "routes";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  pdpContainer: {
    maxWidth: 1400
  },
  section: {
    marginBottom: theme.spacing.unit * 2
  }
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
@withStyles(styles, { withTheme: true })
@inject("uiStore")
@trackProductViewed()
@observer
class ProductDetail extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    product: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    // console.log("uiStore selected vid", props.uiStore.pdpSelectedVariantId);
    if (!props.uiStore.pdpSelectedVariantId) {
      this.selectVariant(props.product.variants[0], null, false);
    }
  }

  @track((props, state, [variant, optionId]) => (
    getVariantTrackingData({
      variant, // Object representing a variant. (Required)
      optionId, // Selected option of the provided variant, if available. (Optional)
      product: props.product // Full product document for additional data. (Optional)
    })
  ))
  selectVariant(variant, optionId, updateRoute = true) {
    const { product, uiStore } = this.props;

    // Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }

    uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

    if (updateRoute) {
      Router.pushRoute("product", {
        slugOrId: product.slug,
        variantId: selectOptionId || variantId
      });
    }
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
      product,
      currencyCode,
      theme,
      uiStore: { pdpSelectedOptionId, pdpSelectedVariantId }
    } = this.props;

    let pdpProductToAddToCart = pdpSelectedVariantId;
    if (pdpSelectedOptionId) {
      pdpProductToAddToCart = pdpSelectedOptionId;
    }

    const productPrice = this.determineProductPrice();

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{product.title}</title>
          <meta name="description" content={product.description} />
        </Helmet>
        <Grid container className={classes.pdpContainer} spacing={theme.spacing.unit * 3}>
          <Grid item xs={12} sm={6}>
            <div className={classes.section}>
              <MediaGallery mediaItems={product.media} />
            </div>
            <div className={classes.section}>
              <TagGrid tags={product.tags.nodes} />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProductDetailTitle
              pageTitle={product.pageTitle}
              title={product.title}
            />
            <ProductDetailInfo
              priceRange={productPrice.displayPrice}
              description={product.description}
              vendor={product.vendor}
            />
            <VariantList
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              currencyCode={currencyCode}
              variants={product.variants}
            />
            <ProductDetailAddToCart variantId={pdpProductToAddToCart} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
