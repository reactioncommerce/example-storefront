import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import { INVENTORY_STATUS } from "lib/utils";

const styles = (theme) => ({
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

@withStyles(styles)
export default class Badge extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    isLowInventory: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string
  }

  render() {
    const {
      classes: {
        alignRight, badge, backorder, bestseller, sale, status, labelStyle, soldOut, warning
      },
      className,
      type,
      label
    } = this.props;

    const badgeClasses = classNames(
      badge,
      { [backorder]: type === INVENTORY_STATUS.BACKORDER },
      { [bestseller]: type === INVENTORY_STATUS.BESTSELLER },
      { [sale]: type === INVENTORY_STATUS.SALE },
      { [status]: type !== INVENTORY_STATUS.LOW_QUANTITY },
      { [soldOut]: type === INVENTORY_STATUS.SOLD_OUT },
      { [alignRight]: type === INVENTORY_STATUS.LOW_QUANTITY },
      className
    );

    const labelClasses = classNames(
      labelStyle,
      { [warning]: type === INVENTORY_STATUS.LOW_QUANTITY }
    );

    return (
      <div className={badgeClasses}>
        <span className={labelClasses}>{label}</span>
      </div>
    );
  }
}
