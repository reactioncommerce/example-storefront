import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./styles";

@withStyles(styles)
export default class ProductDetailOption extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    option: PropTypes.object,
    selectedOption: PropTypes.string
  }

  handleOnClick = () => {
    this.props.onClick(this.props.option);
  }

  render() {
    const {
      classes: { optionButton, optionText, isSelected },
      selectedOption,
      option
    } = this.props;

    const active = (selectedOption === option._id) || false;

    return (
      <ButtonBase
        disableRipple
        onClick={this.handleOnClick}
        className={classNames(
          optionButton,
          { [isSelected]: active }
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
