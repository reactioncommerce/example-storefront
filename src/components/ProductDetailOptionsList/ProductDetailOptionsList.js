import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import { inject, observer } from "mobx-react";
import { Router } from "routes";
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
@inject("pdpStore")
@observer
export default class OptionsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    pdpStore: PropTypes.object,
    productSlug: PropTypes.string,
    theme: PropTypes.object
  }

  selectOption = (option) => {
    const { pdpStore } = this.props;

    pdpStore.selectedOption = option._id;

    Router.pushRoute("product", {
      productSlug: this.props.productSlug,
      variantId: option._id
    });
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
    const { classes: { root }, options, pdpStore, theme } = this.props;

    if (!Array.isArray(options)) return null;

    return (
      <Grid container className={root} spacing={theme.spacing.unit}>
        {options.map((option) => (
          <Grid item key={option._id}>
            <ProductDetailOption
              onClick={this.selectOption}
              selectedOption={pdpStore.selectedOption}
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
