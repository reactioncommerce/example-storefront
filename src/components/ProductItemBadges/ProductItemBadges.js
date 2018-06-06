import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import Badge from "components/Badge";
import { inventoryStatus, isProductBestSeller, isProductLowQuantity, INVENTORY_STATUS } from "lib/utils";

const styles = (theme) => ({
  badgeOverlay: {
    position: "relative"
  },
  faded: {
    opacity: "0.5"
  },
  status: {
    color: theme.palette.primary.contrastText,
    left: theme.spacing.unit,
    top: theme.spacing.unit
  },
  backorder: {
    backgroundColor: theme.palette.reaction.coolGrey
  },
  bestseller: {
    backgroundColor: theme.palette.reaction.badges.bestseller
  },
  lowInventory: {
    backgroundColor: theme.palette.reaction.coolGrey
  },
  sale: {
    backgroundColor: theme.palette.reaction.badges.sale
  },
  soldOut: {
    backgroundColor: theme.palette.reaction.coolGrey
  },
  warning: {
    backgroundColor: "transparent",
    color: theme.palette.secondary.main
  },
  alignRight: {
    right: 0
  },
  secondaryBadge: {
    color: theme.palette.reaction.coolGrey,
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

  renderBadge = () => {
    const { classes, product } = this.props;
    const status = inventoryStatus(product) || {};

    const badgeClasses = classNames({
      [classes.status]: true,
      [classes.backorder]: status.type === INVENTORY_STATUS.BACKORDER,
      [classes.bestseller]: status.type === INVENTORY_STATUS.BESTSELLER,
      [classes.lowInventory]: status.type === INVENTORY_STATUS.LOW_QUANTITY,
      [classes.sale]: status.type === INVENTORY_STATUS.SALE,
      [classes.soldOut]: status.type === INVENTORY_STATUS.SOLD_OUT
    });

    // If status is "BACKORDER" or "SOLD_OUT", only show primary badge
    if (status.type === "BACKORDER" || status.type === "SOLD_OUT") {
      return (
        <Fragment>
          {status && <Badge badgeClasses={badgeClasses} label={status.label} />}
        </Fragment>
      );
    }

    // If any other status, check to see if secondary badges are needed
    return (
      <Fragment>
        {status && <Badge badgeClasses={badgeClasses} label={status.label} />}
        {this.renderSecondaryBadge(status.type)}
      </Fragment>
    );
  }

  renderSecondaryBadge = (primaryBadgeType) => {
    const { classes, product } = this.props;
    const status = inventoryStatus(product) || {};

    if (primaryBadgeType === "SALE") {
      if (isProductLowQuantity(product)) {
        return (
          <Fragment>
            {status && <Badge badgeClasses={classes.secondaryBadge} label={"Low Inventory"} />}
          </Fragment>
        );
      }
      if (isProductBestSeller()) {
        return (
          <Fragment>
            {status && <Badge badgeClasses={classes.secondaryBadge} label={"Best Seller"} />}
          </Fragment>
        );
      }
    }

    if (primaryBadgeType === "LOW_QUANTITY") {
      if (isProductBestSeller()) {
        return (
          <Fragment>
            {status && <Badge badgeClasses={classes.secondaryBadge} label={"Best Seller"} />}
          </Fragment>
        );
      }
    }

    return null;
  }

  render() {
    const { children, classes, product } = this.props;
    const status = inventoryStatus(product) || {};

    const badgeOverlayClasses = classNames({
      [classes.badgeOverlay]: true,
      [classes.faded]: status.type === INVENTORY_STATUS.SOLD_OUT
    });

    return (
      <div className={badgeOverlayClasses}>
        {this.renderBadge()}
        {children}
      </div>
    );
  }
}

export default ProductItemBadges;
