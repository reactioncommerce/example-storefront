import React, { useState } from "react";
import useForm from "react-hook-form";
import { Row } from "react-grid-system";
import withWidth from "@material-ui/core/withWidth";
import { Input, InputLabel } from "@material-ui/core";
import * as s from "./style";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <s.LoginSection component="section">
      <s.Form component="form" onSubmit={handleSubmit(onSubmit)}
        xs={12} sm={12} md={4} lg={4} xl={4}>
        <s.Logo src="static/images/iso.png" />
        <s.Title>Olá <br/> Digite o seu e-mail e senha para começar</s.Title>
        <Row>
          <s.StyledFormControl className={errors.email ? "error-message" : null}>
            <InputLabel htmlFor="email">e-mail</InputLabel>
            <Input
              inputRef={register({
                required: "Campo obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Endereço de email inválido."
                }
              })}
              // onChange={handleInputChange}
              name="email"
              type="email"
            />
            <s.ErrorMessage>{errors.email && errors.email.message}</s.ErrorMessage>
          </s.StyledFormControl>
        </Row>
        <Row>
          <s.StyledFormControl>
            <InputLabel htmlFor="password">senha</InputLabel>
            <Input
              inputRef={register({
                required: "Campo obrigatório."
              })}
              name="password"
              type="password"
            />
            <s.ErrorMessage>{errors.password && errors.password.message}</s.ErrorMessage>
          </s.StyledFormControl>
        </Row>

        <s.LostPasswordLink route="/forgotPassword">Esqueceu sua senha ?</s.LostPasswordLink>
        <s.Button type="submit" value="Continuar"/>
      </s.Form>
      <s.StyledLink href="/sign-up">Criar Conta</s.StyledLink>
    </s.LoginSection>
  );
};

export default withWidth()(LoginForm);
