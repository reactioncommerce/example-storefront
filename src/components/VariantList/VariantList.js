import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BadgeOverlay from "@reactioncommerce/components/BadgeOverlay/v1";
import { badgeStatus, BADGE_LABELS } from "@reactioncommerce/components/BadgeOverlay/v1/utils";
import VariantItem from "components/VariantItem";
import ProductDetailOptionsList from "components/ProductDetailOptionsList";
import Divider from "components/Divider";

const styles = (theme) => ({
  variantsContainer: {
  },
  variantItem: {
    position: "relative",
    marginTop: theme.spacing.unit * 1.25,
    marginBottom: theme.spacing.unit * 1.25
  },
  alert: {
    display: "flex",
    position: "absolute",
    top: -theme.spacing.unit * 2,
    right: theme.spacing.unit * 11
  }
});

@withStyles(styles, { name: "SkVariantList" })
export default class VariantList extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    onSelectOption: PropTypes.func,
    onSelectVariant: PropTypes.func,
    product: PropTypes.object.isRequired,
    selectedOptionId: PropTypes.string,
    selectedVariantId: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  renderVariant = (variant) => {
    const { classes, currencyCode, onSelectVariant, selectedVariantId } = this.props;

    const active = (selectedVariantId === variant._id);

    return (
      <div className={classes.variantItem} key={variant._id}>
        <VariantItem
          currencyCode={currencyCode}
          handleClick={() => { onSelectVariant(variant); }}
          isActive={active}
          variant={variant}
        />
        {this.renderInventoryStatus(variant)}
      </div>
    );
  }

  renderInventoryStatus(variant) {
    const { classes } = this.props;
    const status = badgeStatus(variant, BADGE_LABELS);

    if (!status) return null;

    return (
      <div className={classes.alert}>
        <BadgeOverlay product={variant} filterOnly={"MERCHANDISING"} shouldShowPrimaryOnly={true} label={status.label} />
      </div>
    );
  }

  renderOptionsList() {
    const { onSelectOption, product, selectedOptionId, selectedVariantId, variants } = this.props;
    const selectedVariant = variants.find((variant) => variant._id === selectedVariantId);

    // If currently selected variant has options, then render them.
    const options = (selectedVariant && Array.isArray(selectedVariant.options) && selectedVariant.options.length) ? selectedVariant.options : null;

    if (!options) return null;

    return (
      <Fragment>
        <Divider label="Available Options" />
        <ProductDetailOptionsList
          productSlug={product.slug}
          onSelectOption={onSelectOption}
          options={options}
          selectedOptionId={selectedOptionId}
        />
      </Fragment>
    );
  }

  render() {
    const { classes: { variantsContainer }, variants } = this.props;
    return (
      <div className={variantsContainer}>
        {variants.map(this.renderVariant)}
        {this.renderOptionsList()}
      </div>
    );
  }
}
