import React from "react";
import { InputLabel, Checkbox, FormGroup } from "@material-ui/core";
import * as s from "./style";

const RegisterForm = (props) => {
  const { page } = props;

  return (
    <s.LoginSection>
      <s.Logo src="static/images/iso.png" />
      <s.Title>Não possui cadastro ? <br/> Preencha os campos com os seus dados</s.Title>
      <s.StyledFormControl>
        <InputLabel htmlFor="email">e-mail</InputLabel>
        <s.StyledInput id="email" type="email"/>
      </s.StyledFormControl>
      <s.StyledFormControl>
        <InputLabel htmlFor="password">senha</InputLabel>
        <s.StyledInput id="password" type="password"/>
      </s.StyledFormControl>
      <FormGroup>
        <s.StyledFormControlLabel control={<Checkbox value="terms" />} label="Ao cadastrar-me, declaro que sou maior de idade e aceito as Politicas de Privacidade e os Termos e Condições" />
      </FormGroup>
      <s.Button>Continuar</s.Button>
    </s.LoginSection>
  );
};


export default RegisterForm;
