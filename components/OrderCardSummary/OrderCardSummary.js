import React, { Component } from "react";
import PropTypes from "prop-types";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withTranslation from "hocs/withTranslation";

class OrderCardSummary extends Component {
  static propTypes = {
    classes: PropTypes.object,
    summary: PropTypes.shape({
      fulfillmentTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      itemTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      surchargeTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      taxTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      total: PropTypes.shape({
        displayAmount: PropTypes.string
      })
    })
  }

  render() {
    const { summary, t } = this.props;

    if (summary) {
      const {
        fulfillmentTotal,
        itemTotal,
        surchargeTotal,
        taxTotal,
        total
      } = summary;

      return (
        <CartSummary
          isDense
          displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
          displaySubtotal={itemTotal && itemTotal.displayAmount}
          displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
          displayTax={taxTotal && taxTotal.displayAmount}
          displayTotal={total && total.displayAmount}
          cartTitleText={t("cartTitle")}
          itemsText={t("items")}
          itemLabelText={t("itemsLabel")}
          orderTotalLabelText={t("orderTotalLabel")}
          shippingLabelText={t("shippingLabel")}
          surchargesLabelText={t("surchargesLabel")}
          taxLabelText={t("taxLabel")}
        />
      );
    }

    return null;
  }
}

export default (withTranslation("common")(OrderCardSummary));
