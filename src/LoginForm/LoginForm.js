import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import * as s from "./style";

const LoginForm = (props) => {
  const { page } = props;

  return (
    <s.LoginSection>
      <s.Logo src="static/images/iso.png" />
      <s.Title>Olá <br/> Digite o seu e-mail e senha para começar</s.Title>
      <FormControl>
        <InputLabel htmlFor="email">e-mail</InputLabel>
        <Input id="email" type="email"/>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">senha</InputLabel>
        <Input id="password" type="password"/>
      </FormControl>
      <s.Link>Esqueci minha senha</s.Link>
      <s.Button>Continuar</s.Button>
      <s.StyledLink href="/sign-up">Criar Conta</s.StyledLink>
    </s.LoginSection>
  );
};


export default LoginForm;
