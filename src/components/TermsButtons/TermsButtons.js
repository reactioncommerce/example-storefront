import React, { useState } from "react";
import { Container, Row, Col, Visible } from "react-grid-system";
import PropTypes from "prop-types";
import * as s from "./style";


const TermsButtons = (props) => {
  const { currentTab, setCurrentTab } = props;

  return (
    <Container>
      <Visible xs sm>
        <s.Buttons>
          <s.Button
            className={(currentTab === 1 ? "active" : null)}
            onClick={() => setCurrentTab(1)}
          >Termos e Condições
          </s.Button>
          <s.Row>
            <s.Button
              className={(currentTab === 2 ? "active" : null)}
              onClick={() => setCurrentTab(2)}
            >Politica de Devoluções
            </s.Button>
            <s.Button
              className={(currentTab === 3 ? "active" : null)}
              onClick={() => setCurrentTab(3)}
            >Política de Reembolso
            </s.Button>
          </s.Row>
        </s.Buttons>
      </Visible>
      <Visible md lg xl>
        <s.Buttons>
          <Col md={4}>
            <s.Button className={(currentTab === 1 ? "active" : null)} onClick={() => setCurrentTab(1)}> 
              Termos e Condições
            </s.Button>
          </Col>
          <Col md={4}>
            <s.Button
              className={(currentTab === 2 ? "active" : null)}
              onClick={() => setCurrentTab(2)}
            >Politica de Devoluções
            </s.Button>
          </Col>
          <Col md={4}>
            <s.Button
              className={(currentTab === 3 ? "active" : null)}
              onClick={() => setCurrentTab(3)}
            >Política de Reembolso
            </s.Button>
          </Col>
        </s.Buttons>
      </Visible>
    </Container>
  );
};

TermsButtons.propTypes = {
  currentTab: PropTypes.object,
  setCurrentTab: PropTypes.function
};

export default TermsButtons;
