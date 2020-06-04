import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { inventoryStatus, STATUS_LABELS } from "@reactioncommerce/components/InventoryStatus/v1/utils";
import styles from "./styles";

class ProductDetailOption extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    option: PropTypes.object
  }

  handleOnClick = () => {
    this.props.onClick && this.props.onClick(this.props.option);
  }

  render() {
    const {
      classes: { isSelected, optionButton, optionText, soldOutOption },
      isActive,
      option
    } = this.props;

    const optionInventoryStatus = inventoryStatus(option, STATUS_LABELS);

    return (
      <ButtonBase
        disableRipple
        onClick={this.handleOnClick}
        className={classNames(
          optionButton,
          { [isSelected]: isActive || false },
          { [soldOutOption]: optionInventoryStatus && optionInventoryStatus.type === "SOLD_OUT" }
        )
        }
      >
        <Typography className={optionText} component="span" variant="body1">
          {option.optionTitle}
        </Typography>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(ProductDetailOption);
