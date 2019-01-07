import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { addTypographyStyles, CustomPropTypes } from "@reactioncommerce/components/utils";

const Title = styled.h3`
  ${addTypographyStyles("PaymentsCheckoutAction", "subheadingTextBold")}
`;

const ActionCompleteDiv = styled.div`
  ${addTypographyStyles("PaymentsCheckoutActionComplete", "bodyText")};
`;

class PaymentsCheckoutAction extends Component {
  static renderComplete({ payments }) {
    const text = payments.map(({ displayName }) => displayName).join(", ");
    return (
      <ActionCompleteDiv>{text}</ActionCompleteDiv>
    );
  }

  static propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.shape({
      address1: PropTypes.string.isRequired
    })),
    /**
     * Alert object provides alert into to InlineAlert.
     */
    alert: CustomPropTypes.alert,
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction AddressChoice component or your own component that
       * accepts compatible props.
       */
      AddressChoice: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction InlineAlert component or your own component that
       * accepts compatible props.
       */
      InlineAlert: CustomPropTypes.component.isRequired,
      /**
       * A reaction SelectableList component or compatible component.
       */
      SelectableList: CustomPropTypes.component.isRequired
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
     * When called, the parent should clear all previously submitted
     * payments from state
     */
    onReset: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object has a `payment` property, where
     * `payment` is the Payment that should be passed to the `placeOrder`
     * mutation, and a `displayName` property.
     */
    onSubmit: PropTypes.func,
    /**
     * List of all payment methods available for this shop / checkout
     */
    paymentMethods: PropTypes.arrayOf(PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      InputComponent: CustomPropTypes.component,
      name: PropTypes.string.isRequired,
      shouldCollectBillingAddress: PropTypes.bool.isRequired
    })),
    /**
     * Pass in payment objects previously passed to onSubmit
     */
    payments: PropTypes.arrayOf(PropTypes.object),
    /**
     * Checkout process step number
     */
    stepNumber: PropTypes.number.isRequired
  };

  static defaultProps = {
    onReadyForSaveChange() {},
    onReset() {},
    onSubmit() {}
  };

  constructor(props) {
    super(props);

    const { addresses, paymentMethods } = props;

    let selectedPaymentMethodName = null;
    if (Array.isArray(paymentMethods)) {
      const [method] = paymentMethods;
      if (method) {
        selectedPaymentMethodName = method.name;
      }
    }

    this.state = {
      billingAddress: addresses && addresses[0] ? addresses[0] : null,
      inputIsComplete: false,
      selectedPaymentMethodName
    };
  }

  componentDidMount() {
    this.checkIfReadyForSaveChange();
    this.props.onReset();
  }

  _inputComponent = null;

  submit = async () => {
    if (this._inputComponent) {
      this._inputComponent.submit();
    } else {
      this.handleInputComponentSubmit();
    }
  }

  handleInputComponentSubmit = async ({ amount = null, data, displayName } = {}) => {
    const { onSubmit, paymentMethods } = this.props;
    const { billingAddress, selectedPaymentMethodName } = this.state;

    const selectedPaymentMethod = paymentMethods.find((method) => method.name === selectedPaymentMethodName);

    await onSubmit({
      displayName: displayName || selectedPaymentMethod.displayName,
      payment: {
        amount,
        billingAddress,
        data,
        method: selectedPaymentMethodName
      }
    });
  }

  checkIfReadyForSaveChange() {
    const { onReadyForSaveChange, paymentMethods } = this.props;
    const { billingAddress, inputIsComplete, selectedPaymentMethodName } = this.state;

    const isFilled = billingAddress &&
      Object.keys(billingAddress).every((key) => (["address2", "company"].indexOf(key) > -1 ? true : billingAddress[key] !== null));

    const selectedPaymentMethod = paymentMethods.find((method) => method.name === selectedPaymentMethodName);
    const isInputReady = !selectedPaymentMethod || !selectedPaymentMethod.InputComponent || inputIsComplete;

    onReadyForSaveChange(!!(isInputReady && isFilled));
  }

  handleAddressChange = (billingAddress = null) => {
    this.setState({ billingAddress }, () => {
      this.checkIfReadyForSaveChange();
    });
  };

  handleInputReadyForSaveChange = (inputIsComplete) => {
    this.setState({ inputIsComplete }, () => {
      this.checkIfReadyForSaveChange();
    });
  }

  handleSelectedPaymentMethodChange = (selectedPaymentMethodName) => {
    this.setState({ selectedPaymentMethodName }, () => {
      this.checkIfReadyForSaveChange();
    });
  };

  renderBillingAddressForm() {
    const { addresses, components: { AddressChoice }, isSaving } = this.props;

    return (
      <Fragment>
        <Title>Billing Address</Title>
        <AddressChoice addresses={addresses} isReadOnly={isSaving} onChange={this.handleAddressChange} />
      </Fragment>
    );
  }

  renderPaymentMethodList() {
    const {
      components: { SelectableList },
      isSaving,
      paymentMethods
    } = this.props;

    if (paymentMethods.length < 2) return null;

    const { selectedPaymentMethodName } = this.state;
    const options = paymentMethods.map((method) => ({
      id: method.name,
      label: method.displayName,
      value: method.name
    }));

    return (
      <SelectableList
        name="paymentMethodList"
        isReadOnly={isSaving}
        onChange={this.handleSelectedPaymentMethodChange}
        options={options}
        value={selectedPaymentMethodName}
      />
    );
  }

  render() {
    const {
      alert,
      className,
      components: { InlineAlert },
      isSaving,
      label,
      paymentMethods,
      stepNumber
    } = this.props;

    const { selectedPaymentMethodName } = this.state;
    const selectedPaymentMethod = paymentMethods.find((method) => method.name === selectedPaymentMethodName);

    return (
      <div className={className}>
        <Title>
          {stepNumber}. {label}
        </Title>
        {alert ? <InlineAlert {...alert} /> : ""}
        {this.renderPaymentMethodList()}
        {!!selectedPaymentMethod && !!selectedPaymentMethod.InputComponent &&
          <selectedPaymentMethod.InputComponent
            isSaving={isSaving}
            onReadyForSaveChange={this.handleInputReadyForSaveChange}
            onSubmit={this.handleInputComponentSubmit}
            ref={(instance) => { this._inputComponent = instance; }}
          />}
        {!!selectedPaymentMethod && !!selectedPaymentMethod.shouldCollectBillingAddress && this.renderBillingAddressForm()}
      </div>
    );
  }
}

export default withComponents(PaymentsCheckoutAction);
