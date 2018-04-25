import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import Typography from "material-ui/Typography";
import classNames from "classnames";

const styles = (theme) => ({
  variantButton: {
    "display": "flex",
    "justifyContent": "space-between",
    "textTransform": "none",
    "width": "100%",
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.contrastText,
    "border": "1px solid",
    "borderColor": theme.palette.primary.contrastText,
    "paddingTop": theme.spacing.unit * 1.25,
    "paddingBottom": theme.spacing.unit * 1.25,
    "paddingLeft": theme.spacing.unit * 2.5,
    "paddingRight": theme.spacing.unit * 2.5,
    "&:hover": {
      border: "1px solid",
      borderColor: theme.palette.primary.activeElementBorderColor,
      backgroundColor: theme.palette.primary.contrastText
    }
  },
  activeVariant: {
    border: "1px solid",
    borderColor: theme.palette.primary.activeElementBorderColor
  }
});

@withStyles(styles, { withTheme: true })
class VariantItem extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    classes: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    variant: PropTypes.object.isRequired
  }

  onClick = () => {
    this.props.handleClick(this.props.variant);
  }

  render() {
    const {
      classes: { variantButton, activeVariant },
      variant: { title, price },
      active
    } = this.props;

    return (
      <ButtonBase
        disableRipple
        className={classNames(variantButton, { [activeVariant]: active })}
        onClick={this.onClick}
      >
        <Typography component="span" variant="body1">
          {title}
        </Typography>
        <Typography component="span" variant="body1">
          {price.range}
        </Typography>
      </ButtonBase>
    );
  }
}

export default VariantItem;
