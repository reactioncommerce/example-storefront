import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Badge from "components/Badge";
import { badgeStatus, isProductBestseller, isProductLowQuantity, BADGE_TYPES } from "lib/utils";

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
    right: theme.spacing.unit,
    top: theme.spacing.unit
  }
});


@withStyles(styles)
class BadgeOverlay extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    filterOnly: PropTypes.string,
    product: PropTypes.object.isRequired,
    shouldShowPrimaryOnly: PropTypes.bool
  };

  static defaultProps = {
    classes: {}
  };

  renderBadge = () => {
    const { classes, filterOnly, product, shouldShowPrimaryOnly } = this.props;
    const status = badgeStatus(product);

    if (!status) return null;

    const badgeClasses = classNames({
      [classes.status]: true,
      [classes.backorder]: status.type === BADGE_TYPES.BACKORDER,
      [classes.bestseller]: status.type === BADGE_TYPES.BESTSELLER,
      [classes.lowInventory]: status.type === BADGE_TYPES.LOW_QUANTITY,
      [classes.sale]: status.type === BADGE_TYPES.SALE,
      [classes.soldOut]: status.type === BADGE_TYPES.SOLD_OUT
    });

    if (filterOnly) {
      if (status.type === filterOnly) {
        return (
          <Badge badgeClasses={badgeClasses} label={status.label} />
        );
      }

      return null;
    }

    // If status is "BACKORDER" or "SOLD_OUT", only show primary badge
    if (status.type === "BACKORDER" || status.type === "SOLD_OUT" || shouldShowPrimaryOnly) {
      return (
        <Badge badgeClasses={badgeClasses} label={status.label} />
      );
    }

    // If any other status, check to see if secondary badges are needed
    return (
      <Fragment>
        <Badge badgeClasses={badgeClasses} label={status.label} />
        {this.renderSecondaryBadge(status.type)}
      </Fragment>
    );
  }

  renderSecondaryBadge = (primaryBadgeType) => {
    const { classes, product } = this.props;

    if (primaryBadgeType === "SALE") {
      if (isProductLowQuantity(product)) {
        return (
          <Badge badgeClasses={classes.secondaryBadge} label={"Low Inventory"} />
        );
      }
      if (isProductBestseller(product)) {
        return (
          <Badge badgeClasses={classes.secondaryBadge} label={"Bestseller"} />
        );
      }
    }

    if (primaryBadgeType === "LOW_QUANTITY") {
      if (isProductBestseller(product)) {
        return (
          <Badge badgeClasses={classes.secondaryBadge} label={"Bestseller"} />
        );
      }
    }

    return null;
  }

  render() {
    const { children, classes, product } = this.props;
    const status = badgeStatus(product) || {};

    const badgeOverlayClasses = classNames({
      [classes.badgeOverlay]: true,
      [classes.faded]: status.type === BADGE_TYPES.SOLD_OUT
    });

    return (
      <div className={badgeOverlayClasses}>
        {this.renderBadge()}
        {children}
      </div>
    );
  }
}

export default BadgeOverlay;
