import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import Badge from "components/Badge";
import { inventoryStatus, isProductLowQuantity, INVENTORY_STATUS, priceByCurrencyCode } from "lib/utils";
// import { styles } from "./styles";


const styles = (theme) => ({
  badgeOverlay: {
    position: "relative"
  },
  badge: {
    ...theme.typography.caption,
    borderRadius: 4,
    height: "auto",
    fontSize: "0.7rem",
    paddingBottom: theme.spacing.unithalf,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unithalf,
    position: "absolute",
    zIndex: 100
  },
  labelStyle: {
    fontWeight: theme.typography.fontWeightBold,
    position: "relative",
    whiteSpace: "nowrap",
    padding: 0
  },
  status: {
    color: theme.palette.primary.contrastText,
    left: theme.spacing.unit,
    top: theme.spacing.unit
  },
  soldOut: {
    backgroundColor: theme.palette.secondary.main
  },
  backorder: {
    backgroundColor: theme.palette.secondary.dark
  },
  sale: {
    backgroundColor: theme.palette.error.main
  },
  bestseller: {
    backgroundColor: theme.palette.reaction.bestseller
  },
  warning: {
    backgroundColor: "transparent",
    color: theme.palette.secondary.main
  },
  alignRight: {
    right: 0
  }
});


@withStyles(styles, { withTheme: true })
@inject("uiStore")
@observer
class ProductItemBadges extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    product: PropTypes.object.isRequired
  };

  static defaultProps = {
    classes: {}
  };

  renderBadge() {
    const { product } = this.props;
    const status = inventoryStatus(product);

    return (
      <Fragment>
        {status && <Badge type={status.type} label={status.label} />}
        {isProductLowQuantity(product) && <Badge type={INVENTORY_STATUS.LOW_QUANTITY} label="Low Inventory" />}
      </Fragment>
    );
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.badgeOverlay}>
        {this.renderBadge()}
        {children}
      </div>
    );
  }
}

export default ProductItemBadges;
