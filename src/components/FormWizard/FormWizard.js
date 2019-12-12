import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "react-grid-system";
import FormWizardAddress from "components/FormWizardAddress";
import FormWizardShipment from "components/FormWizardShipment";
import FormWizardPayment from "components/FormWizardPayment";
import FormWizardFinish from "components/FormWizardFinish";
import order from "helpers/ORDERS_MOCK.json"
import * as s from "./style";

const FormWizard = (props) => {
  const [stepWizard, setStepWizard] = useState(0);
  const [firstStep, setFirstStep] = useState({});
  const [secondStep, setSecondStep] = useState({});
  const showSteps = () => {
    console.log({firstStep});
    console.log({secondStep});
  };
  
  return (
    <Container>
      <button onClick={showSteps}>mostrar steps</button>
      <s.StyledRow>
        <s.FormTitle>1- Endereço de entrega</s.FormTitle>
        <FormWizardAddress setStepWizard={setStepWizard} setFirstStep={setFirstStep} isVisible={stepWizard}/>
      </s.StyledRow>
      <s.StyledRow>
        <s.FormTitle>2- Método de envio</s.FormTitle>
        <FormWizardShipment setStepWizard={setStepWizard} setSecondStep={setSecondStep} isVisible={stepWizard}/>
      </s.StyledRow>
      <s.StyledRow>
        <s.FormTitle>3- Informações de pagamento</s.FormTitle>
        <FormWizardPayment setStepWizard={setStepWizard} isVisible={stepWizard}/>
      </s.StyledRow>
      <s.StyledRow>
        <s.FormTitle>4- Revise e finalize o pedido</s.FormTitle>
        <FormWizardFinish setStepWizard={setStepWizard} products={order} isVisible={stepWizard}/>
      </s.StyledRow>
    </Container>
  );
};

FormWizard.propTypes = {
  banner: PropTypes.string
};

export default FormWizard;
