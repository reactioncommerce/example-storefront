import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
import useForm from "react-hook-form";
import * as s from "./style";

const FormWizardAddress = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const { isVisible, setStepWizard, setFirstStep } = props;
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [number, setNumber] = useState("");
  const [addon, setAddon] = useState("");
  const onSubmit = data => {
    setStepWizard(1);
    setFirstStep(data);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "birthday") setBirthday(value);
    if (name === "cpf") setCpf(value);
    if (name === "cep") setCep(value);
    if (name === "address") setAddress(value);
    if (name === "province") setProvince(value);
    if (name === "number") setNumber(value);
    if (name === "addon") setAddon(value);
  }

  if (isVisible <= 0) {
    return (
      <Container fluid component="form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <FormControl>
              <s.StyledInputLabel htmlFor="name">Nome Completo</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="name" ref={register({ required: "Required" })} />
              {errors.name && errors.name.message}
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormControl>
              <s.StyledInputLabel htmlFor="birthday">Data de nascimento</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="birthday" ref={register({ required: true })}/>
            </FormControl>
          </Col>
          <Col xs={6}>
            <FormControl>
              <s.StyledInputLabel htmlFor="cpf">CPF</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="cpf" ref={register({ required: true })}/>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormControl>
              <s.StyledInputLabel htmlFor="cep">CEP</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="cep" ref={register({ required: true })}/>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormControl>
              <s.StyledInputLabel htmlFor="address">Endereço</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="address" ref={register({ required: true })}/>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormControl>
              <s.StyledInputLabel htmlFor="province">Estado</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="province" ref={register({ required: true })}/>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormControl>
              <s.StyledInputLabel htmlFor="number">Número</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="number" ref={register({ required: true })}/>
            </FormControl>
          </Col>
          <Col xs={6}>
            <FormControl>
              <s.StyledInputLabel htmlFor="addon">Complemento</s.StyledInputLabel>
              <Input required onChange={handleInputChange} name="addon" ref={register({ required: true })}/>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Este é um endereço comercial" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <s.Button primary type="submit">Continuar</s.Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <s.Button secondary>CANCELAR</s.Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return null;
};

FormWizardAddress.propTypes = {
  banner: PropTypes.string
};

export default FormWizardAddress;
