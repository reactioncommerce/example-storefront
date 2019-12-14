import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import * as s from "./style";

const LoginForm = (props) => {
  const { page } = props;

  return (
    <s.LoginSection component="section" md={4} sm={12}>
      <s.Form>
        <s.Logo src="static/images/iso.png" />
        <s.Title>Olá <br/> Digite o seu e-mail e senha para começar</s.Title>
        <s.StyledFormControl>
          <InputLabel htmlFor="email">e-mail</InputLabel>
          <Input id="email" type="email"/>
        </s.StyledFormControl>
        <s.StyledFormControl>
          <InputLabel htmlFor="password">senha</InputLabel>
          <Input id="password" type="password"/>
        </s.StyledFormControl>
        <s.SLink route="/forgotPassword">Esqueci minha senha</s.SLink>
        <s.Button>Continuar</s.Button>
      </s.Form>
      <s.StyledLink href="/sign-up">Criar Conta</s.StyledLink>
    </s.LoginSection>
  );
};


export default LoginForm;
