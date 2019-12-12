import React, { useState } from "react";
import PropTypes from "prop-types";
import FormWizardPaymentCard from "components/FormWizardPaymentCard";
import { Col, Row } from "react-grid-system";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import * as s from "./style";

const FormWizardPayment = (props) => {
  const { isVisible, setStepWizard } = props;
  const [isCreditCard, setIsCreditCard] = useState(0);
  const handleChange = (event) => setIsCreditCard(event.target.value);
  const handleSubmit = (event) => setStepWizard(event.target.value);
  if (isVisible === 2 || isVisible === "2") {
    return (
      <s.StyledContainer onSubmit={handleSubmit} component="form">
        <s.StyledFormControl component="fieldset">
          <RadioGroup aria-label="paymentOptions" onChange={handleChange} name="paymentOptions">
            <FormControlLabel value={0} control={<Radio />} label="Boleto" />
            <FormControlLabel value={1} control={<Radio />} label="Cartão de crédito" />
          </RadioGroup>
        </s.StyledFormControl>
        {isCreditCard ? (<FormWizardPaymentCard isVisible={isCreditCard} />) : null }
        <s.FormTitle>3.1- Endereço de cobrança</s.FormTitle>
        <s.StyledFormControl component="fieldset">
          <RadioGroup aria-label="paymentAddress" name="paymentAddress">
            <FormControlLabel value="actual" control={<Radio />} label="Endereço atual: Nome da rua, XXX, complemento" />
            <FormControlLabel value="other" control={<Radio />} label="Usar outro endereço" />
          </RadioGroup>
        </s.StyledFormControl>
      </s.StyledContainer>
    );
  }
  return null;
};

FormWizardPayment.propTypes = {
  isVisible: PropTypes.bool,
  stepWizard: PropTypes.func
};

export default FormWizardPayment;
