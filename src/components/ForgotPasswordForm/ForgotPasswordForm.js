import React from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import * as s from "./style";

const LostPasswordForm = (props) => {
  const { page } = props;

  return (
    <s.LoginSection component="section" md={4} sm={12}>
      <s.Form>
        <s.Logo src="static/images/iso.png" />
        <s.Title>Esqueceu sua senha ? <br/> Digite seu e-mail para recuperar</s.Title>
        <s.StyledFormControl>
          <InputLabel htmlFor="email">e-mail</InputLabel>
          <Input id="email" type="email"/>
        </s.StyledFormControl>

        <s.Button>Continuar</s.Button>
      </s.Form>

    </s.LoginSection>
  );
};


export default LostPasswordForm;
