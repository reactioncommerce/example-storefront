import React from "react";
import PropTypes from "prop-types";
import Field from "@reactioncommerce/components/Field/v1";
import Button from "@reactioncommerce/components/Button/v1";
import Select from "@reactioncommerce/components/Select/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";

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
  };

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.onSubmit(this.state.cardInfo);
  };
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
            options={this.props.installments}
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

export default UnboxPayCredit;
