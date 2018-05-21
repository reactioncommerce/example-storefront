import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { Router } from "routes";
import VariantItem from "components/VariantItem";
import ProductDetailOptionsList from "components/ProductDetailOptionsList";
import Badge from "components/Badge";
import { inventoryStatus } from "lib/utils";
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

@withStyles(styles)
@observer
export default class VariantList extends Component {
  static propTypes = {
    classes: PropTypes.object,
    product: PropTypes.object.isRequired,
    variants: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);
    // Select first variant by default
    this.selectedVariant = props.variants[0]._id;
  }

  @observable _selectedVariant = null;

  @action
  handleClick = (variant) => {
    this._selectedVariant = variant._id;

    Router.pushRoute("product", {
      slugOrId: this.props.product.slug,
      variantId: variant._id
    });
  }

  @computed
  get selectedVariant() {
    return this._selectedVariant;
  }

  set selectedVariant(value) {
    this._selectedVariant = value;
  }

  renderVariant = (variant) => {
    const { classes } = this.props;
    const active = (this.selectedVariant === variant._id);

    return (
      <div className={classes.variantItem} key={variant._id}>
        <VariantItem
          isActive={active}
          handleClick={this.handleClick}
          variant={variant}
        />
        {this.renderInventoryStatus(variant)}
      </div>
    );
  }

  renderInventoryStatus(variant) {
    const { classes } = this.props;
    const status = inventoryStatus(variant);

    if (!status) return null;

    return (
      <div className={classes.alert}>
        <Badge type={status.type} label={status.label} />
      </div>
    );
  }

  renderOptionsList = () => {
    const selectedVariant = this.props.variants.find((variant) => variant._id === this.selectedVariant);

    // If currently selected variant has options, then render them.
    const options = (Array.isArray(selectedVariant.options)) ? selectedVariant.options : null;

    if (!options) return null;

    return (
      <Fragment>
        <Divider label="Available Options" />
        <ProductDetailOptionsList
          productSlug={this.props.product.slug}
          options={options}
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
