import React from "react";
import PropTypes from "prop-types";
import OrderResume from "components/OrderResume";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

import * as s from "./style";

const FormWizardFinish = (props) => {
  const { isVisible, setStepWizard, order } = props;

  return (
    <s.StyledContainer fluid>
      <s.StyledRow align="center" justify="between" sm={12}>
        <h3>Produto</h3>
        <h3>Preço</h3>
      </s.StyledRow>
      { order.items.map((product) => (
        <s.StyledRow component="li">
          <Col xs={3}>
            <s.ImageBox>
              <s.Image src={product.photo} alt=""/>
            </s.ImageBox>
          </Col>
          <s.StyledCol xs={6}>
            <s.Title>{product.title}</s.Title>
            <s.Variant>{product.variantTitle}</s.Variant>
           
          </s.StyledCol>
          <s.StyledCol xs={3}>
            <s.Controls>
              <s.Price>${product.total}</s.Price>
            </s.Controls>
          </s.StyledCol>
        </s.StyledRow>
      )) }
      <OrderResume order={order}/ >
    </s.StyledContainer>
  );
};

FormWizardFinish.propTypes = {
  isVisible: PropTypes.bool,
  setStepWizard: PropTypes.func
};

export default FormWizardFinish;
