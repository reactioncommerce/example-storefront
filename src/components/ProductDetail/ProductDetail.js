import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";

// PDP Components
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailInfo from "components/ProductDetailInfo";
import MediaGallery from "components/MediaGallery";
import TagGrid from "components/TagGrid";
import { Router } from "routes";

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
@observer
class ProductDetail extends Component {
  static propTypes = {
    classes: PropTypes.object,
    product: PropTypes.object,
    theme: PropTypes.object,
    uiStore: PropTypes.object.isRequired
  }

  componentWillMount() {
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

    Router.pushRoute("product", {
      slugOrId: product.slug,
      variantId: selectOptionId || variantId
    });
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

  render() {
    const { classes, product, theme, uiStore } = this.props;

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
              priceRange={product.price.range}
              description={product.description}
              vendor={product.vendor}
            />
            <VariantList
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={uiStore.pdpSelectedOptionId}
              selectedVariantId={uiStore.pdpSelectedVariantId}
              variants={product.variants}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetail;
