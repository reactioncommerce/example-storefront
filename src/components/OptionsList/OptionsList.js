import React, { Component } from "react";
import PropTypes from "prop-types";

import ProductDetailOption from "components/ProductDetailOption";
import options from "./__mocks__/options.mock";

class OptionsList extends Component {
  static propTypes = {
    productOptions: PropTypes.object
  }

  renderProductOption = (option) => (
    <li>
      <ProductDetailOption option={option} />
    </li>
  )

  render() {
    return (
      <ul>
        {options.map(this.renderProductOption)}
      </ul>
    );
  }
}

export default OptionsList;
