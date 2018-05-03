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
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 0.5,
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
    backgroundColor: theme.palette.primary.light
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
        badge, status, labelStyle, soldOut, backorder, warning, alignRight
      },
      className,
      type,
      label
    } = this.props;

    const badgeClasses = classNames(
      badge,
      { [status]: type === INVENTORY_STATUS.SOLD_OUT || type === INVENTORY_STATUS.BACKORDER },
      { [soldOut]: type === INVENTORY_STATUS.SOLD_OUT },
      { [backorder]: type === INVENTORY_STATUS.BACKORDER },
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
