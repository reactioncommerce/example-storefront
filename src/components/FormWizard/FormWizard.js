import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Visible } from "react-grid-system";
import FormWizardAddress from "components/FormWizardAddress";
import Button from "components/Button";
import FormWizardShipment from "components/FormWizardShipment";
import FormWizardPayment from "components/FormWizardPayment";
import FormWizardFinish from "components/FormWizardFinish";
import order from "helpers/ORDER_MOCK.json";
import * as s from "./style";

const FormWizard = (props) => {
  const [stepWizard, setStepWizard] = useState(0);
  const [firstStep, setFirstStep] = useState({
    name: "",
    birthday: "",
    cpf: "",
    cep: "",
    address: "",
    province: "",
    number: "",
    addon: ""
  });
  const [secondStep, setSecondStep] = useState({
    isCreditCard: false,
    number: "",
    cvc: "",
    expiry: "",
    name: ""
  });

  const handleTitleClick = (num) => setStepWizard(num);
  
  return (
    <Container>
      <Visible xs sm>
        <s.StyledRow >
          <s.FormTitle onClick={() => handleTitleClick(0)}>1- Endereço de entrega</s.FormTitle>
          <FormWizardAddress firstStep={firstStep} setStepWizard={setStepWizard} setFirstStep={setFirstStep} isVisible={stepWizard}/>
        </s.StyledRow>
        <s.StyledRow>
          <s.FormTitle onClick={() => handleTitleClick(1)}>2- Método de envio</s.FormTitle>
          <FormWizardShipment secondStep={secondStep} setStepWizard={setStepWizard} setSecondStep={setSecondStep} isVisible={stepWizard}/>
        </s.StyledRow>
        <s.StyledRow>
          <s.FormTitle onClick={() => handleTitleClick(2)}>3- Informações de pagamento</s.FormTitle>
          <FormWizardPayment setStepWizard={setStepWizard} isVisible={stepWizard}/>
        </s.StyledRow>
        <s.StyledRow>
          <s.FormTitle>4- Revise e finalize o pedido</s.FormTitle>
          <FormWizardFinish setStepWizard={setStepWizard} order={order} isVisible={stepWizard}/>
        </s.StyledRow>
      </Visible>
      <Visible md lg xl>
        <Row>
          <Col md={7} >
            <s.StyledRow align="center" justify="start">
              <s.FormTitle onClick={() => handleTitleClick(0)}>1- Endereço de entrega</s.FormTitle>
              <FormWizardAddress firstStep={firstStep} setStepWizard={setStepWizard} setFirstStep={setFirstStep} isVisible={stepWizard}/>
            </s.StyledRow>
            <Row align="center" justify="start">
              <s.FormTitle onClick={() => handleTitleClick(1)}>2- Método de envio</s.FormTitle>
              <FormWizardShipment secondStep={secondStep} setStepWizard={setStepWizard} setSecondStep={setSecondStep} isVisible={stepWizard}/>
            </Row>
            <Row align="center" justify="start">
              <s.FormTitle onClick={() => handleTitleClick(2)}>3- Informações de pagamento</s.FormTitle>
              <FormWizardPayment setStepWizard={setStepWizard} isVisible={stepWizard}/>
            </Row>
          </Col>
          <Col md={4} offset={{ md: 1 }} >
            <s.StyledRow>
              <s.FormTitle>4- Revise e finalize o pedido</s.FormTitle>
              <FormWizardFinish setStepWizard={setStepWizard} order={order} isVisible={stepWizard}/>
            </s.StyledRow>
            <Row><Button secondary>FINALIZAR PEDIDO</Button></Row>
          </Col>
        </Row>
      </Visible>
    </Container>
  );
};

FormWizard.propTypes = {
  banner: PropTypes.string
};

export default FormWizard;
