import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";

import { Router } from "routes";
import VariantItem from "components/VariantItem";
import OptionsList from "components/OptionsList";
import Divider from "components/Divider";

const styles = (theme) => ({
  variantsContainer: {
  },
  variantItem: {
    marginTop: theme.spacing.unit * 1.25,
    marginBottom: theme.spacing.unit * 1.25
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
      <div className={variantItem} key={variant._id}>
        <VariantItem
          active={active}
          handleClick={this.handleClick}
          variant={variant}
        />
      </div>
    );
  }

  renderOptionsList = () => {
    const selectedVariant = this.props.variants.find((variant) => variant._id === this.selectedVariant);

    // If currently selected variant has options, then render them.
    const options = (selectedVariant.options.length) ? selectedVariant.options : null;

    return (
      <React.Fragment>
        {options &&
          <div>
            <Divider />
            <div>
              <OptionsList options={options} />
            </div>
          </div>
        }
      </React.Fragment>
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

export default VariantList;
