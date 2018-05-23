import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Badge from "components/Badge";
import { inventoryStatus } from "lib/utils";
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
    const status = inventoryStatus(option);

    if (!status) return null;

    return (
      <div className={classes.alert}>
        <Badge className={classes.badge} type={status.type} label={status.label} />
      </div>
    );
  }

  render() {
    const { classes: { root }, onSelectOption, options, theme, selectedOptionId } = this.props;

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
