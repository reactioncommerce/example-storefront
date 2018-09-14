import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

const styles = (theme) => theme.ProductDetailOption;

@withStyles(styles)
export default class ProductDetailOption extends Component {
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
      classes: { optionButton, optionText, isSelected },
      isActive,
      option
    } = this.props;

    return (
      <ButtonBase
        disableRipple
        onClick={this.handleOnClick}
        className={classNames(
          optionButton,
          { [isSelected]: isActive || false }
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
