import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonBase from "material-ui/ButtonBase";
import Typography from "material-ui/Typography";

class ProductDetailOption extends Component {
  static propTypes = {
    option: PropTypes.object
  }

  render() {
    return (
      <ButtonBase>
        <Typography component="span" variant="body1">
          {this.props.option.optionTitle}
        </Typography>
      </ButtonBase>
    );
  }
}

export default ProductDetailOption;
