import React from "react";
import PropTypes from "prop-types";
import Field from "@reactioncommerce/components/Field/v1";
import Button from "@reactioncommerce/components/Button/v1";
import Select from "@reactioncommerce/components/Select/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";
import { CartContext } from "../../../../../components/CheckoutActions/CheckoutActions";

class UnboxPayCredit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: true,
      cardInfo: {
        amount: "",
        cardHolder: "",
        expirationMonth: "",
        expirationYear: "",
        cardNumber: "",
        securityCode: "",
        installments: 0
      }
    };
  }

  handleStateChange = (value, name = "") => {
    const { settings } = this.state;
    settings[name] = value;
    this.setState({ settings });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.onSubmit(this.state.cardInfo);
  }

  getInstallmentOptions = () => {
    const { cart } = this.props;

    let installments = [];
    // $20,00
    const minInstallmentValue = 2000;

    let totalAmount = cart.displayTotal.replace('R$', '').replace(',', '');
    let currentAmount = totalAmount;
    let index = 1;

    while (currentAmount > minInstallmentValue && index < 13) {
      currentAmount = (totalAmount/index).toString();
      installments.push({
        label: `R$${currentAmount.slice(0, 2)},${currentAmount.slice(2, 4)}`,
        value: `R$${currentAmount.slice(0, 1)},${currentAmount.slice(2, 4)}`,
      });
      index += 1;
    }

    return installments;
  }

  render() {
    return (
      // TODO: This component must translations later
      <div>
        <Field name="cardHolderLabel" label="Card Holder" labelFor="cardHolderInput">
          <TextInput
            value={this.state.cardInfo.cardHolder}
            id="cardHolderInput"
            name="cardHolderInput"
            placeholder="Name of the card holder"
          />
        </Field>
        <Field name="cardNumberLabel" label="Card Number" labelFor="cardNumberInput">
          <TextInput
            value={this.state.cardInfo.cardNumber}
            id="cardNumberInput"
            name="cardNumberInput"
            placeholder="The card number"
          />
        </Field>
        <Field name="cardExpirationMonthLabel" label="Expiration Month" labelFor="cardExpirationMonthInput">
          <TextInput
            value={this.state.cardInfo.expirationMonth}
            id="cardExpirationMonthInput"
            name="cardExpirationMonthInput"
            placeholder="MM"
          />
        </Field>
        <Field name="cardExpirationYearLabel" label="Expiration Year" labelFor="cardExpirationYearInput">
          <TextInput
            value={this.state.cardInfo.expirationYear}
            id="cardExpirationYearInput"
            name="cardExpirationYearInput"
            placeholder="YY"
          />
        </Field>
        <Field name="securityCode" label="CVV" labelFor="securityCodeInput">
          <TextInput
            value={this.state.cardInfo.securityCode}
            id="securityCodeInput"
            name="securityCodeInput"
            placeholder="CVV"
          />
        </Field>
        <Field name="installmentsLabel" label="installments" labelFor="installmentsSelect">
          <Select
            options={this.getInstallmentOptions()}
            id="installmentsSelect"
            name="installmentsSelect"
            placeholder="Select The number of installments"
          />
        </Field>
        <Button
          isDisabled={!this.state.isReady}
          onClick={() => {
            this.props.onSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
}

UnboxPayCredit.propTypes = {
  installments: PropTypes.object.isRequired
};

class UnboxPayCreditContainer extends React.Component {
  render() {
    return (
      <CartContext.Consumer>
        {cart => (
          <UnboxPayCredit {...this.props} cart={cart} />
        )
        }
      </CartContext.Consumer>
    );
  }
} 

export default UnboxPayCreditContainer;
