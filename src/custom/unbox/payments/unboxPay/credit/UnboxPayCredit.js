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
    const { cardInfo } = this.state;
    cardInfo[name] = value;
    this.setState({ cardInfo });
  }

  handleSubmit = (e) => {
    console.log(this.state.cardInfo);
    return this.props.onSubmit({
      data: {
        ...this.state.cardInfo,
        paymentType: 'credit',
      },
    });
  }

  getInstallmentOptions = () => {
    const { cart } = this.props;

    let installments = [];

    // $20,00
    const minInstallmentValue = 2000;

    let totalAmount = cart.displayTotal.replace('R$', '').replace(',', '');
    let currentAmount = totalAmount;
    let index = 1;

    while (currentAmount/index > minInstallmentValue && index < 13) {
      currentAmount = (totalAmount/index).toString();
      installments.push({
        label: `${index}x - R$${currentAmount.slice(0, 2)},${currentAmount.slice(2, 4)}`,
        value: `R$${currentAmount.slice(0, 2)},${currentAmount.slice(2, 4)}`,
      });
      index += 1;
    }
    if (installments.length === 0) {
      installments.push({
        label: `1x - ${cart.displayTotal}`,
        value: cart.displayTotal,
      });
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
            onChange={(e) => this.handleStateChange(e, 'cardHolder')}
          />
        </Field>
        <Field name="cardNumberLabel" label="Card Number" labelFor="cardNumberInput">
          <TextInput
            value={this.state.cardInfo.cardNumber}
            id="cardNumberInput"
            name="cardNumberInput"
            placeholder="The card number"
            onChange={(e) => this.handleStateChange(e, 'cardNumber')}
          />
        </Field>
        <Field name="cardExpirationMonthLabel" label="Expiration Month" labelFor="cardExpirationMonthInput">
          <TextInput
            value={this.state.cardInfo.expirationMonth}
            id="cardExpirationMonthInput"
            name="cardExpirationMonthInput"
            placeholder="MM"
            onChange={(e) => this.handleStateChange(e, 'expirationMonth')}
          />
        </Field>
        <Field name="cardExpirationYearLabel" label="Expiration Year" labelFor="cardExpirationYearInput">
          <TextInput
            value={this.state.cardInfo.expirationYear}
            id="cardExpirationYearInput"
            name="cardExpirationYearInput"
            placeholder="YY"
            onChange={e => this.handleStateChange(e, 'expirationYear')}
          />
        </Field>
        <Field name="securityCode" label="CVV" labelFor="securityCodeInput">
          <TextInput
            value={this.state.cardInfo.securityCode}
            id="securityCodeInput"
            name="securityCodeInput"
            placeholder="CVV"
            onChange={(e) => this.handleStateChange(e, 'securityCode')}
          />
        </Field>
        <Field name="installmentsLabel" label="installments" labelFor="installmentsSelect">
          <Select
            options={this.getInstallmentOptions()}
            value={this.state.cardInfo.installments}
            id="installmentsSelect"
            name="installmentsSelect"
            placeholder="Select The number of installments"
            onChange={(e) => this.handleStateChange(e, 'installments')}
          />
        </Field>
        <Button
          isDisabled={!this.state.isReady}
          onClick={() => {
            this.handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
}

UnboxPayCredit.propTypes = {
  cart: PropTypes.object.isRequired
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
