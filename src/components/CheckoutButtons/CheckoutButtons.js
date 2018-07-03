import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@reactioncommerce/components/Button/v1";

export default class CheckoutButtons extends Component {
  static propTypes = {
    /**
     * Set to `true` to prevent the button from calling `onClick` when clicked
     */
    isDisabled: PropTypes.bool,
    /**
     * On click function to pass to the Button component. Not handled internally, directly passed
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Text to display inside the button
     */
    primaryButtonText: PropTypes.string,
    /**
     * className for primary checkout button
     */
    primaryClassName: PropTypes.string
  }

  static defaultProps = {
    primaryButtonText: "Checkout"
  };

  handleOnClick = () => {
    this.props.onClick();
  }

  render() {
    const { isDisabled, primaryClassName, primaryButtonText } = this.props;

    return (
      <Button
        actionType="important"
        className={primaryClassName}
        isDisabled={isDisabled}
        onClick={this.handleOnClick}
        isFullWidth
      >
        {primaryButtonText}
      </Button>
    );
  }
}
