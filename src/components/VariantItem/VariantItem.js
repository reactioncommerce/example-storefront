import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import Typography from "material-ui/Typography";
import classNames from "classnames";

import styles from "./styles";

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
