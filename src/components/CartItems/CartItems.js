import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// const itemsList = [
//   {
//     productUrl: "https://cdn.shopify.com/s/files/1/0468/9441/products/wc_Taft_FW16_OnWhite_20160720_0056_1024x1024-min_1024x.jpg",
//     title: "The Troy Boot in Black",
//     vendor: "TAFT",
//     color: "Black",
//     size: 8
//   },
//   {
//     productUrl: "https://cdn.shopify.com/s/files/1/0468/9441/products/Taft_OnWhite_20180402-010-min_grande.jpg",
//     title: "The Jude Boot in Tonal",
//     vendor: "TAFT",
//     color: "Light Brown",
//     size: 8
//   }
// ];

export default class CartItems extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      productUrl: PropTypes.string,
      title: PropTypes.string,
      vendor: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.number
    })),
    components: PropTypes.shape({
      CartItemPriceComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      CartItemQuantityInputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      CartItemStockWarningComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      CartItemsComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    })
  }

  render() {
    const { items } = this.props;

    return (
      <Fragment>
        {items.map((item) => (
          <div>
            {item.title}
          </div>
        ))}
      </Fragment>
    );
  }
}
