import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import badgeStatus from "lib/utils/badgeStatus";
import { BADGE_TYPES } from "lib/utils/badgeTypes";
import BadgeOverlay from "components/BadgeOverlay";
import ProductDetailOption from "components/ProductDetailOption";

const styles = (theme) => ({
  root: {
    position: "relative",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  alert: {
    display: "flex",
    top: -theme.spacing.unit * 2,
    right: theme.spacing.unit * 1
  },
  badge: {
    fontSize: "0.5rem",
    top: -theme.spacing.unit,
    left: theme.spacing.unit * 11
  }
});

@withStyles(styles, { withTheme: true })
@observer
export default class OptionsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSelectOption: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    productSlug: PropTypes.string,
    selectedOptionId: PropTypes.string,
    theme: PropTypes.object
  }

  renderInventoryStatus(option) {
    const { classes } = this.props;
    const status = badgeStatus(option);

    if (!status) return null;

    return (
      <div className={classes.alert}>
        <BadgeOverlay product={option} filterOnly={BADGE_TYPES.SALE} shouldShowPrimaryOnly={true} label={status.label} />
      </div>
    );
  }

  render() {
    const {
      classes: { root },
      onSelectOption,
      options,
      selectedOptionId,
      theme
    } = this.props;

    if (!Array.isArray(options)) return null;

    return (
      <Grid container className={root} spacing={theme.spacing.unit}>
        {options.map((option) => (
          <Grid item key={option._id}>
            <ProductDetailOption
              isActive={selectedOptionId === option._id}
              onClick={onSelectOption}
              option={option}
            />
            {this.renderInventoryStatus(option)}
          </Grid>
        ))
        }
      </Grid>
    );
  }
}
