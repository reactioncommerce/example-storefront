import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

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
  }
});

@withStyles(styles)
class VariantItem extends Component {
  render() {
    const {
      classes: { variantButton },
      variant: { title, price }
    } = this.props;

    return (
      <Button
        disableRipple
        className={variantButton}
      >
        <Typography variant="body1">
          {title}
        </Typography>
        <Typography variant="body1">
          {price.range}
        </Typography>
      </Button>
    );
  }
}

VariantItem.propTypes = {
  classes: PropTypes.object,
  variant: PropTypes.object.isRequired
};

export default VariantItem;
