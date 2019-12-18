import React, { useState } from "react";
import useForm from "react-hook-form";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import * as s from "./style";

const LoginForm = (props) => {
  const { page } = props;
  const { register, handleSubmit,  errors } = useForm();

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
        <s.StyledFormControl>
          <InputLabel htmlFor="email">e-mail</InputLabel>
          <Input
            // onChange={handleInputChange}
            id="email"
            type="email"
            ref={register({
              required: "Campo obrigatório.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              }
            })}
          />
          {errors.email && errors.email.message}
        </s.StyledFormControl>
        <s.StyledFormControl>
          <InputLabel htmlFor="password">senha</InputLabel>
          <Input id="password" type="password"/>
        </s.StyledFormControl>
        <s.SLink route="/forgotPassword">Esqueci minha senha</s.SLink>
        <s.Button type="submit">Continuar</s.Button>
      </s.Form>
      <s.StyledLink href="/sign-up">Criar Conta</s.StyledLink>
    </s.LoginSection>
  );
};

LoginForm.propTypes = {
  page: PropTypes.string
};

export default withWidth()(LoginForm);
