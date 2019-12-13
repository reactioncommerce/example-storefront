import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "react-grid-system";
import FormWizardAddress from "components/FormWizardAddress";
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
      <s.StyledRow>
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
    </Container>
  );
};

FormWizard.propTypes = {
  banner: PropTypes.string
};

export default FormWizard;
