import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import classNames from "classnames";

const styles = () => ({
  variantButton: {
    "display": "flex",
    "justifyContent": "space-between",
    "textTransform": "none",
    "width": "100%",
    "transition": "opacity 200ms linear",
    "borderRadius": "2px",
    "backgroundColor": "#fff",
    "border": "1px solid #fff",
    "padding": "10px 20px",
    "&:hover": {
      border: "1px solid #94e8d1",
      backgroundColor: "#fff"
    }
  },
  activeVariant: {
    border: "1px solid #94e8d1"
  }
});

@withStyles(styles)
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
      <Button
        disableRipple
        className={classNames(variantButton, { [activeVariant]: active })}
        onClick={this.onClick}
      >
        <Typography componest="span" variant="body1">
          {title}
        </Typography>
        <Typography component="span" variant="body1">
          {price.range}
        </Typography>
      </Button>
    );
  }
}

export default VariantItem;
