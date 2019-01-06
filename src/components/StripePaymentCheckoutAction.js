import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";
import { addTypographyStyles, CustomPropTypes } from "@reactioncommerce/components/utils";

const Title = styled.h3`
  ${addTypographyStyles("StripePaymentCheckoutAction", "subheadingTextBold")}
`;

const SecureCaption = styled.div`
  ${addTypographyStyles("StripePaymentCheckoutAction", "captionText")}
`;

const IconLockSpan = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const Span = styled.span`
  vertical-align: super;
`;

const billingAddressOptions = [{
  id: "1",
  label: "Same as shipping address",
  value: "same_as_shipping"
},
{
  id: "2",
  label: "Use a different billing address",
  value: "use_different_billing_address"
}];

class StripePaymentCheckoutAction extends Component {
  static renderComplete({ paymentData }) {
    return (
      <div>
        {!!paymentData && paymentData.displayName}
      </div>
    );
  }

  static propTypes = {
    /**
     * Alert object provides alert into to InlineAlert.
     */
    alert: CustomPropTypes.alert,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction AddressForm component or your own component that
       * accepts compatible props.
       */
      AddressForm: CustomPropTypes.component.isRequired,
      /**
       * Secured lock icon
       */
      iconLock: PropTypes.node,
      /**
       * A reaction SelectableList component or compatible component.
       */
      SelectableList: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction StripeForm component or your own component that
       * accepts compatible props.
       */
      StripeForm: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction InlineAlert component or your own component that
       * accepts compatible props.
       */
      InlineAlert: CustomPropTypes.component.isRequired
    }),
    /**
     * Is the payment input being saved?
     */
    isSaving: PropTypes.bool,
    /**
     * Label of workflow step
     */
    label: PropTypes.string.isRequired,
    /**
     * When this action's input data switches between being
     * ready for saving and not ready for saving, this will
     * be called with `true` (ready) or `false`
     */
    onReadyForSaveChange: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object has `payment` and `displayName`
     * properties, where `payment` is the Payment that should be
     * passed to the `placeOrder` mutation.
     */
    onSubmit: PropTypes.func,
    /**
     * Checkout process step number
     */
    stepNumber: PropTypes.number.isRequired
  };

  static defaultProps = {
    onReadyForSaveChange() { }
  };

  state = {
    billingAddressOptionValue: "same_as_shipping"
  };

  componentDidMount() {
    const { onReadyForSaveChange } = this.props;
    onReadyForSaveChange(false);
  }

  _addressForm = null;

  submit = async () => {
    const { billingAddressOptionValue } = this.state;

    // If user chooses to use billing address to be the same as shipping, then
    // don't submit the billing address form
    if (billingAddressOptionValue === "same_as_shipping") {
      await this.handleSubmit();
    } else {
      await this._addressForm.submit();
    }
  }

  handleSubmit = async (value) => {
    const { onSubmit } = this.props;
    const { token } = await this._stripe.createToken();

    await onSubmit({
      displayName: `${token.card.brand} ending in ${token.card.last4}`,
      payment: {
        billingAddress: value,
        data: {
          stripeTokenId: token.id
        },
        method: "stripe_card"
      }
    });
  }

  handleChange = (values) => {
    const { onReadyForSaveChange } = this.props;
    const isFilled = Object.keys(values).every((key) => (key === "address2" ? true : values[key] !== null));

    onReadyForSaveChange(isFilled);
  };

  handleUseNewBillingAddress = (billingAddressOptionValue) => {
    this.setState({ billingAddressOptionValue });
  }

  renderBillingAddressForm = () => {
    const { components: { AddressForm } } = this.props;
    const { billingAddressOptionValue } = this.state;

    // Only render billing address when user chooses to use
    // a different billing address
    if (billingAddressOptionValue === "same_as_shipping") {
      return null;
    }


    return (
      <Fade in={true}>
        <AddressForm
          ref={(formEl) => {
            this._addressForm = formEl;
          }}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </Fade>
    );
  }

  render() {
    const {
      alert,
      components: { iconLock, InlineAlert, SelectableList, StripeForm },
      label,
      onReadyForSaveChange,
      stepNumber
    } = this.props;

    const { billingAddressOptionValue } = this.state;

    return (
      <Fragment>
        <Title>
          {stepNumber}. {label}
        </Title>
        {alert ? <InlineAlert {...alert} /> : ""}
        <StripeForm
          isComplete={onReadyForSaveChange}
          stripeRef={(stripe) => { this._stripe = stripe; }}
        />
        <SecureCaption>
          <IconLockSpan>{iconLock}</IconLockSpan> <Span>Your Information is private and secure.</Span>
        </SecureCaption>
        <Title>Billing Address</Title>
        <SelectableList
          onChange={this.handleUseNewBillingAddress}
          options={billingAddressOptions}
          name="billingAddressForm"
          value={billingAddressOptionValue}
        />
        {this.renderBillingAddressForm()}
      </Fragment>
    );
  }
}

export default withComponents(StripePaymentCheckoutAction);
