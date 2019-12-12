import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

import * as s from "./style";

const FormWizardFinish = (props) => {
  const { isVisible, setStepWizard, products } = props;

  return products.map((product) => (

    <s.StyledContainer fluid>
      <s.StyledRow align="center" justify="between" sm={12}>
        <h3>Produto</h3>
        <h3>Preço</h3>
      </s.StyledRow>
      <s.StyledRow component="li">
        <Col xs={3}>
          <s.ImageBox>
            <s.Image src={product.metafields} alt=""/>
          </s.ImageBox>
        </Col>
        <s.StyledCol xs={6}>
          <s.Title>{product.title}</s.Title>
          <s.Variant>{product.variantTitle}</s.Variant>
          <s.QuantityCounter>
            <s.CounterButton>-</s.CounterButton>
            <s.Quantity>{product.quantity}</s.Quantity>
            <s.CounterButton>+</s.CounterButton>
          </s.QuantityCounter>
        </s.StyledCol>
        <s.StyledCol xs={3}>
          <s.Controls>
            <s.Button>X</s.Button>
            <s.Price>${product.price}</s.Price>
          </s.Controls>
        </s.StyledCol>
      </s.StyledRow>
    </s.StyledContainer>
  ));
};

FormWizardFinish.propTypes = {
  isVisible: PropTypes.bool,
  setStepWizard: PropTypes.func
};

export default FormWizardFinish;
