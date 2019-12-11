import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import * as s from "./style";

const FormWizardShipment = (props) => {
  const { isVisible, setStepWizard } = props;
  const handleChange = (event) => setStepWizard(2);
  if (isVisible === "1" || isVisible === 1) {
    return (
      <Col xs={12}>
        <FormControl component="fieldset">
          <RadioGroup defaultValue="express" aria-label="paymentOptions" onChange={handleChange} name="paymentOptions">
            <FormControlLabel value="express" control={<Radio />} label="Expresso (em até 1 dia útil)" />
            <FormControlLabel value="normal" control={<Radio />} label="Normal (de 3 a 4 dias úteis)" />
          </RadioGroup>
        </FormControl>
      </Col>
    );
  }
  return null;

};

FormWizardShipment.propTypes = {
  isVisible: PropTypes.bool,
  setStepWizard: PropTypes.func
};

export default FormWizardShipment;
