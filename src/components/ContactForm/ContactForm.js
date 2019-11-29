import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Select, MenuItem } from "@material-ui/core";
import * as s from "./style";


const ContactForm = (props) => {
  const { title, description } = props.contact;

  return (
    <s.ContactSection>
      <s.Title>{title}</s.Title>
      <s.Description>{description}</s.Description>
      <s.ContactForm>
        <s.FormRow>
          <s.ContactFormControl>
            <s.ContactInputLabel htmlFor="name">Seu nome</s.ContactInputLabel>
            <s.ContactInput id="name" />
          </s.ContactFormControl>
        </s.FormRow>
        <s.FormRow>
          <s.ContactFormControl>
            <s.ContactInputLabel htmlFor="email">Seu email</s.ContactInputLabel>
            <s.ContactInput id="email" />
          </s.ContactFormControl>
        </s.FormRow>
        <s.FormRow>
          <s.ContactFormControl>
            <s.ContactInputLabel htmlFor="reason">Motivo do contato</s.ContactInputLabel>
            <Select id="reason" >
              <MenuItem value={1}>Devolução</MenuItem>
              <MenuItem value={2}>Reclamação</MenuItem>
            </Select>
          </s.ContactFormControl>
        </s.FormRow>
        <s.FormRow>

          <s.ContactFormControl>
            <TextField
              id="text"
              label="Digite sua mensagem"
              multiline={true}
              rows={4}
              maxLength="1000"
              rowsMax={6}
            />
          </s.ContactFormControl>
        </s.FormRow>
        <s.ContactButton>Enviar</s.ContactButton>
      </s.ContactForm>
    </s.ContactSection>
  );
};

ContactForm.propTypes = {
  contact: PropTypes.object
};

export default ContactForm;
