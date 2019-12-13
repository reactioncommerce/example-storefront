import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
import * as s from "./style";

const FormWizardOrder = (props) => {
  const { banner } = props;

  return (
    <Container component="form">
      <s.FormTitle>4- Revise e finalize o pedido</s.FormTitle>
      <Row>
        <Col xs={12}>
          <FormControl>
            <InputLabel htmlFor="name">Nome Completo</InputLabel>
            <Input id="name"/>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormControl>
            <InputLabel htmlFor="birthday">Data de nascimento</InputLabel>
            <Input id="birthday"/>
          </FormControl>
        </Col>
        <Col xs={6}>
          <FormControl>
            <InputLabel htmlFor="CPF">CPF</InputLabel>
            <Input id="CPF"/>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormControl>
            <InputLabel htmlFor="CEP">CEP</InputLabel>
            <Input id="CEP"/>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormControl>
            <InputLabel htmlFor="address">Endereço</InputLabel>
            <Input id="address"/>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormControl>
            <InputLabel htmlFor="state">Estado</InputLabel>
            <Input id="state"/>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormControl>
            <InputLabel htmlFor="number">Número</InputLabel>
            <Input id="number"/>
          </FormControl>
        </Col>
        <Col xs={6}>
          <FormControl>
            <InputLabel htmlFor="addon">Complemento</InputLabel>
            <Input id="addon"/>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup>
            <FormControlLabel control={<Checkbox value="comercialAddress" />} label="Este é um endereço comercial" />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

FormWizardOrder.propTypes = {
  banner: PropTypes.string
};

export default FormWizardOrder;