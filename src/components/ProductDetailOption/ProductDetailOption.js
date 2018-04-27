import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ButtonBase from "material-ui/ButtonBase";
import Typography from "material-ui/Typography";
import classNames from "classnames";
import styles from "./styles";

@withStyles(styles)
export default class ProductDetailOption extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    option: PropTypes.object
  }

  handleOnClick = () => {
    this.props.onClick(this.props.option);
  }

  render() {
    const {
      classes: { variantOptionContainer, optionButton, optionText, isSelected }
    } = this.props;

    return (
      <div className={variantOptionContainer}>
        <ButtonBase
          onClick={this.handleOnClick}
          className={classNames(optionButton, { [isSelected]: this.props.isSelected })}
          disableRipple
        >
          <Typography className={optionText} component="span" variant="body1">
            {this.props.option.optionTitle}
          </Typography>
        </ButtonBase>
      </div>
    );
  }
}
