/* eslint-disable no-console */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/Button";
import { Container, Col, Row, Visible } from "react-grid-system";
import useForm from "react-hook-form";
import * as s from "./style";


const MyAccount = (props) => {
  const { register } = useForm();
  const { title, description, account } = props;
  const [fullname, setFullname] = useState(account.fullname);
  const [birthday, setBirthday] = useState(account.birthday);
  const [cpf, setCpf] = useState(account.cpf);
  const [address, setAddress] = useState(account.address);
  const [cep, setCep] = useState(account.cep);
  const [province, setProvince] = useState(account.province);
  const [number, setNumber] = useState(account.number);
  const [addon, setAddon] = useState(account.addon);
  const [tel, setTel] = useState(account.tel);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fullname") setFullname({ fullname: value });
    if (name === "address") setAddress({ address: value });
    if (name === "birthday") setBirthday({ birthday: value });
    if (name === "cpf") setCpf({ cpf: value });
    if (name === "cep") setCep({ cep: value });
    if (name === "province") setProvince({ province: value });
    if (name === "number") setNumber({ number: value });
    if (name === "addon") setAddon({ addon: value });
    if (name === "tel") setTel({ tel: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = {
      fullname,
      birthday,
      cpf,
      cep,
      province,
      number,
      addon,
      tel
    };
  };

  return (
    <Container fluid>
      <Visible xs sm>
        <s.MyAccountContainer component="section">
          <Col component="form" onSubmit={onSubmit}>
            <s.Title>{title}</s.Title>
            <s.Description>{description}</s.Description>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="fullname">Nome completo</InputLabel>
                <Input onChange={handleChange} ref={register} value={fullname} name="fullname" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="birthday">Data de nascimento</InputLabel>
                <Input onChange={handleChange} ref={register} value={birthday} name="birthday" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="cpf">CPF</InputLabel>
                <Input onChange={handleChange} ref={register} value={cpf} name="cpf" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="cep">CEP</InputLabel>
                <Input onChange={handleChange} ref={register} value={cep} name="cep" />
              </s.StyledFormControl>
            </Row>
            <Row>  
              <s.StyledFormControl>
                <InputLabel htmlFor="address">Endereço</InputLabel>
                <Input onChange={handleChange} ref={register} value={address} name="address" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="province">Estado</InputLabel>
                <Input onChange={handleChange} ref={register} value={province} name="province" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="number">Número</InputLabel>
                <Input onChange={handleChange} ref={register} value={number} name="number" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="addon">Complemento</InputLabel>
                <Input onChange={handleChange} ref={register} value={addon} name="addon" />
              </s.StyledFormControl>
            </Row>
            <Row>
              <s.StyledFormControl>
                <InputLabel htmlFor="tel">Telefone para contato</InputLabel>
                <Input onChange={handleChange} ref={register} value={tel} name="tel" />
              </s.StyledFormControl>
            </Row>
            <Row align="center" justify="center">
              <s.SaveButton type="submit">Salvar dados</s.SaveButton>
            </Row>
          </Col>
        </s.MyAccountContainer>
      </Visible>
      <Visible md lg xl>
        <Container>
          <Row>
            <s.Menu md={3}>
              <s.StyledLink className="active" route={"/"}>
                <s.MenuIcon src="static/images/icon-profile.svg"/>
                Minha Conta
              </s.StyledLink>
              <s.StyledLink route={"/orders"}>
                <s.MenuIcon src="static/images/icon-orders.svg"/>
                Meus Pedidos
              </s.StyledLink>
            </s.Menu>
            <Col md={8} component="form" onSubmit={onSubmit}>
              <s.Title>{title}</s.Title>
              <s.Description>{description}</s.Description>
              <Row>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="fullname">Nome completo</InputLabel>
                    <Input onChange={handleChange} ref={register} value={fullname} name="fullname" />
                  </s.StyledFormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="birthday">Data de nascimento</InputLabel>
                    <Input onChange={handleChange} ref={register} value={birthday} name="birthday" />
                  </s.StyledFormControl>
                </Col>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="cpf">CPF</InputLabel>
                    <Input onChange={handleChange} ref={register} value={cpf} name="cpf" />
                  </s.StyledFormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="cep">CEP</InputLabel>
                    <Input onChange={handleChange} ref={register} value={cep} name="cep" />
                  </s.StyledFormControl>
                </Col>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="address">Endereço</InputLabel>
                    <Input onChange={handleChange} ref={register} value={address} name="address" />
                  </s.StyledFormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="province">Estado</InputLabel>
                    <Input onChange={handleChange} ref={register} value={province} name="province" />
                  </s.StyledFormControl>
                </Col>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="number">Número</InputLabel>
                    <Input onChange={handleChange} ref={register} value={number} name="number" />
                  </s.StyledFormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="addon">Complemento</InputLabel>
                    <Input onChange={handleChange} ref={register} value={addon} name="addon" />
                  </s.StyledFormControl>
                </Col>
                <Col>
                  <s.StyledFormControl>
                    <InputLabel htmlFor="tel">Telefone para contato</InputLabel>
                    <Input onChange={handleChange} ref={register} value={tel} name="tel" />
                  </s.StyledFormControl>
                </Col>
              </Row>
              <Row align="center" justify="end">
                <s.SaveButton type="submit">Salvar dados</s.SaveButton>
              </Row>
            </Col>
          </Row>
        </Container>
      </Visible>
    </Container >
  );
};

MyAccount.propTypes = {
  account: PropTypes.object,
  callToAction: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string
};

export default MyAccount;
