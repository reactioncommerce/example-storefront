import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@reactioncommerce/components/Button/v1";
import { Router } from "routes";

export default class CheckoutButtons extends Component {
  static propTypes = {
    /**
     * Set to `true` to prevent the button from calling `onClick` when clicked
     */
    isDisabled: PropTypes.bool,
    /**
     * The NextJS route name for the primary checkout button.
     */
    primaryButtonRoute: PropTypes.string,
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
    primaryButtonRoute: "/cart/checkout",
    primaryButtonText: "Checkout"
  };

  handleOnClick = () => {
    const { primaryButtonRoute } = this.props;
    Router.pushRoute(primaryButtonRoute);
  }

  render() {
    const {
      isDisabled,
      primaryClassName,
      primaryButtonText
    } = this.props;

    return (
      <Button
        actionType="important"
        className={primaryClassName}
        isDisabled={isDisabled}
        isFullWidth
        onClick={this.handleOnClick}
      >
        {primaryButtonText}
      </Button>
    );
  }
}
