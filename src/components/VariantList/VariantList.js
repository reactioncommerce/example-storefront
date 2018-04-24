import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";

import { Router } from "routes";
import VariantItem from "components/VariantItem";
import variants from "./__mocks__/variants.mock";

// Sort by index value
variants.sort((variant1, variant2) => variant1.index - variant2.index);

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
  @observable _selectedVariant = variants[0].node.product._id;

  @action
  handleClick = (variant) => {
    this._selectedVariant = variant._id;
    Router.pushRoute("product", { productSlug: variant.slug, variantId: variant._id });
  }

  @computed
  get selectedVariant() {
    return this._selectedVariant;
  }

  renderVariant = (variant) => {
    const { classes: { variantItem } } = this.props;
    const { node: { product } } = variant;
    const active = (this.selectedVariant === product._id);

    return (
      <li className={variantItem} key={product._id}>
        <VariantItem
          active={active}
          handleClick={this.handleClick}
          variant={variant.node.product}
        />
      </li>
    );
  }

  render() {
    const { classes: { variantsList } } = this.props;
    return (
      <ul className={variantsList}>
        {variants.map(this.renderVariant)}
      </ul>
    );
  }
}

VariantList.propTypes = {
  classes: PropTypes.object
};

export default VariantList;
