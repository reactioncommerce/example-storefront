import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
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
      classes: { variantButton, activeVariant },
      currencyCode,
      variant: { title, pricing },
      isActive
    } = this.props;

    const variantPrice = priceByCurrencyCode(currencyCode, pricing);

    return (
      <ButtonBase
        disableRipple
        className={classNames(variantButton, { [activeVariant]: isActive })}
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
