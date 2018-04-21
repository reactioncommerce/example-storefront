import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

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
class VariantList extends Component {
  renderVariant = (variant) => {
    const { classes: { variantItem } } = this.props;
    return (
      <li className={variantItem} key={variant.node.product._id}>
        <VariantItem variant={variant.node.product} />
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
