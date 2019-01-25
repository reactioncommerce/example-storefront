import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { inventoryStatus, STATUS_LABELS } from "@reactioncommerce/components/InventoryStatus/v1/utils";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";

const styles = (theme) => ({
  variantButton: {
    "display": "flex",
    "justifyContent": "space-between",
    "textTransform": "none",
    "width": "100%",
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.contrastText,
    "border": "1px solid",
    "borderColor": theme.palette.reaction.borderColor,
    "padding": theme.spacing.unit * 2,
    "&:hover": {
      border: "1px solid",
      borderColor: theme.palette.reaction.activeElementBorderColor,
      backgroundColor: theme.palette.primary.contrastText
    },
    "&:focus": {
      outline: "auto 5px -webkit-focus-ring-color"
    }
  },
  activeVariant: {
    border: "1px solid",
    borderColor: theme.palette.reaction.activeElementBorderColor
  },
  soldOutVariant: {
    opacity: 0.2
  }
});

@withStyles(styles, { name: "SkVariantItem" })
class VariantItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    variant: PropTypes.object.isRequired
  }

  onClick = () => {
    this.props.handleClick(this.props.variant);
  }

  render() {
    const {
      classes: { variantButton, activeVariant, soldOutVariant },
      currencyCode,
      variant,
      isActive
    } = this.props;
    const { pricing, title } = variant;

    const variantInventoryStatus = inventoryStatus(variant, STATUS_LABELS);

    const variantPrice = priceByCurrencyCode(currencyCode, pricing);

    const className = classNames(variantButton, {
      [activeVariant]: isActive
    }, {
      [soldOutVariant]: variantInventoryStatus && variantInventoryStatus.type === "SOLD_OUT"
    });

    return (
      <ButtonBase
        disableRipple
        className={className}
        onClick={this.onClick}
      >
        <Typography component="span" variant="body1">
          {title}
        </Typography>
        <Typography component="span" variant="body1">
          {variantPrice.displayPrice}
        </Typography>
      </ButtonBase>
    );
  }
}

export default VariantItem;
