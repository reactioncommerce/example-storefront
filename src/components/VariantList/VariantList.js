import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import VariantItem from "components/VariantItem";

const variantList = [
  {
    _id: "ookONEUTHe2424",
    title: "Basic Variant",
    price: {
      range: "$9.99-$19.99",
      min: 9.99,
      max: 19.99
    },
    index: 0
  },
  {
    _id: "outhhraoe242004HNOE",
    title: "Complex Variant",
    price: {
      range: "$99.99-$199.99",
      min: 99.99,
      max: 199.99
    },
    index: 1
  }
].sort((variant1, variant2) => variant1.index - variant2.index);

const styles = () => ({
  variantsList: {
    listStyle: "none"
  }
});

@withStyles(styles)
class VariantList extends Component {
  renderVariant(variant) {
    return (
      <li key={variant._id}>
        <VariantItem variant={variant} />
      </li>
    );
  }

  render() {
    const { classes: { variantsList } } = this.props;

    return (
      <ul className={variantsList}>
        {variantList.map(this.renderVariant)}
      </ul>
    );
  }
}

VariantList.propTypes = {
  classes: PropTypes.object
};

export default VariantList;
