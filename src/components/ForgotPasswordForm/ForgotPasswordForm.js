import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import * as s from "./style";

const LostPasswordForm = (props) => {
  const { page } = props;

  return (
    <s.LoginSection>
      <s.Logo src="static/images/iso.png" />
      <s.Title>Esqueceu sua senha ? <br/> Digite seu e-mail para recuperar</s.Title>
      <FormControl>
        <InputLabel htmlFor="email">e-mail</InputLabel>
        <Input id="email" type="email"/>
      </FormControl>

      <s.Button>Continuar</s.Button>
    </s.LoginSection>
  );
};


export default LostPasswordForm;
