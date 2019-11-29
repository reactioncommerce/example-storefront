import React, { useState } from "react";
import PropTypes from "prop-types";
import * as s from "./style";


const TermsButtons = (props) => {
  const {currentTab, setCurrentTab} = props;

  return (
    <s.Buttons>
      <s.Button
        className={(currentTab === 1 ? "active" : null)}
        onClick={() => setCurrentTab(1)}
      >Termos e Condições</s.Button>
      <s.Row>
        <s.Button
          className={(currentTab === 2 ? "active" : null)}
          onClick={() => setCurrentTab(2)}
        >Politica de Devoluções</s.Button>
        <s.Button
          className={(currentTab === 3 ? "active" : null)}
          onClick={() => setCurrentTab(3)}
        >Política de Reembolso</s.Button>
      </s.Row>
    </s.Buttons>
  );
};

TermsButtons.propTypes = {
  faq: PropTypes.object
};

export default TermsButtons;
