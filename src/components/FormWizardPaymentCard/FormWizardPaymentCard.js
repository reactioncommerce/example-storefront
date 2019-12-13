/* eslint-disable require-jsdoc */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Cards from "react-credit-cards";
import { Col, Row, Container } from "react-grid-system";
import { Input, InputLabel,  Select, MenuItem, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import * as s from "./style";


const FormWizardPaymentCard = (props) => {
  const { register, handleSubmit,  errors } = useForm();
  const { isVisible, setStepWizard, setSecondStep, secondStep } = props;
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "cvc") setCvc(value);
    if (name === "expiry") setExpiry(value);
    if (name === "number") setNumber(value);
    if (name === "name") setName(value);
  }
  const handleInputFocus = (e) => {
    setFocus({ focus: e.target.name });
  };

  const onSubmit = () => {
    setSecondStep({
      cvc,
      expiry,
      number,
      name
    });
  };

  if (isVisible === 1 || isVisible === "1") {
    return (
      <s.StyledRow component="form" onSubmit>
        <Cards cvc={cvc} expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        />
        <s.StyledFormControl>
          <InputLabel htmlFor="name">Titular do cartão</InputLabel>
          <Input
            type="text"
            name="name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </s.StyledFormControl>
        <s.StyledFormControl>
          <InputLabel htmlFor="number">Número do cartão</InputLabel>
          <Input
            type="tel"
            name="number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </s.StyledFormControl>
        <s.StyledFormControl>
          <InputLabel htmlFor="date" >Data de expiração</InputLabel>
          <Input
            type="tel"
            name="expiry"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </s.StyledFormControl>
        <s.StyledFormControl>
          <InputLabel htmlFor="cvc">CVV</InputLabel>
          <Input
            type="tel"
            name="cvc"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </s.StyledFormControl>
        <s.StyledFormControl>
          <InputLabel htmlFor="reason">Parcelas</InputLabel>
          <s.StyledSelect
            id="reason"
            name="reason"
            onChange={handleInputChange}
          >
            <MenuItem value="1">1x</MenuItem>

          </s.StyledSelect>
        </s.StyledFormControl>

      </s.StyledRow>
    );
  }
  return null;
};

FormWizardPaymentCard.propTypes = {
  isVisible: PropTypes.bool
};

export default FormWizardPaymentCard;
