import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

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
    zIndex: theme.zIndex.appBar
  },
  labelStyle: {
    fontWeight: theme.typography.fontWeightBold,
    position: "relative",
    whiteSpace: "nowrap",
    padding: 0,
    letterSpacing: "0.5px",
    fontSize: "11px"
  },
  alignRight: {
    right: 0
  }
});

@withStyles(styles)
export default class Badge extends Component {
  static propTypes = {
    badgeClasses: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    labelClasses: PropTypes.object,
    type: PropTypes.string
  }

  render() {
    const {
      badgeClasses: importedBadgeClasses,
      classes,
      label,
      labelClasses: importedLabelClasses
    } = this.props;

    const badgeClasses = classNames(
      classes.badge,
      importedBadgeClasses
    );

    const labelClasses = classNames(
      classes.labelStyle,
      importedLabelClasses
    );

    return (
      <div className={badgeClasses}>
        <span className={labelClasses}>{label}</span>
      </div>
    );
  }
}
