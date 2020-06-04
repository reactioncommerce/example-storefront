import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import BadgeOverlay from "@reactioncommerce/components/BadgeOverlay/v1";
import { BADGE_LABELS, BADGE_TYPES, badgeStatus } from "@reactioncommerce/components/BadgeOverlay/v1/utils";
import ProductDetailOption from "components/ProductDetailOption";

const styles = (theme) => ({
  root: {
    position: "relative",
    marginTop: theme.spacing(),
    marginBottom: theme.spacing()
  },
  alert: {
    display: "flex",
    top: -theme.spacing(2),
    right: theme.spacing(1)
  },
  badge: {
    fontSize: "0.5rem",
    top: -theme.spacing(),
    left: theme.spacing(11)
  }
});

class OptionsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSelectOption: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    productSlug: PropTypes.string,
    selectedOptionId: PropTypes.string,
    theme: PropTypes.object
  }

  renderBadges(option) {
    const { classes } = this.props;
    const status = badgeStatus(option, BADGE_LABELS);

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
      selectedOptionId
    } = this.props;

    if (!Array.isArray(options)) return null;

    return (
      <Grid container className={root} spacing={1}>
        {options.map((option) => (
          <Grid item key={option._id}>
            <ProductDetailOption
              isActive={selectedOptionId === option._id}
              onClick={onSelectOption}
              option={option}
            />
            {this.renderBadges(option)}
          </Grid>
        ))
        }
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OptionsList);
