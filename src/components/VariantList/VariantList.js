import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";

import { Router } from "routes";
import VariantItem from "components/VariantItem";

const styles = () => ({
  variantsList: {
    listStyle: "none",
    paddingLeft: 0
  },
  variantItem: {
    margin: "10px 0"
  }
});

@withStyles(styles)
@observer
class VariantList extends Component {
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
      productSlug: this.props.product.slug,
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
    const { classes: { variantItem } } = this.props;
    const active = (this.selectedVariant === variant._id);

    return (
      <li className={variantItem} key={variant._id}>
        <VariantItem
          active={active}
          handleClick={this.handleClick}
          variant={variant}
        />
      </li>
    );
  }

  render() {
    const { classes: { variantsList }, variants } = this.props;
    return (
      <ul className={variantsList}>
        {variants.map(this.renderVariant)}
      </ul>
    );
  }
}

export default VariantList;
