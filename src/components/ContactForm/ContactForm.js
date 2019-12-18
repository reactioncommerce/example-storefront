import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Visible } from "react-grid-system";
import { TextField, Select, MenuItem } from "@material-ui/core";
import * as s from "./style";


const ContactForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [text, setText] = useState("");

  const { title, description } = props.contact;

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <s.ContactSection>
      <Container>

      <s.Title>{title}</s.Title>
      <s.Description>{description}</s.Description>
      <s.ContactForm onSubmit={handleSubmit} >
        <s.FormRow>
          <s.ContactFormControl>
            <s.ContactInputLabel htmlFor="name">Seu nome</s.ContactInputLabel>
            <s.ContactInput
              value={name}
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </s.ContactFormControl>
        </s.FormRow>
        <s.FormRow>
          <s.ContactFormControl>
            <s.ContactInputLabel htmlFor="email">Seu email</s.ContactInputLabel>
            <s.ContactInput
              id="email"
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </s.ContactFormControl>
        </s.FormRow>
        <s.FormRow>
          <s.ContactFormControl>
            <s.ContactInputLabel htmlFor="reason">Motivo do contato</s.ContactInputLabel>
            <s.ContactSelect
              id="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              <MenuItem value="Produto">Produto</MenuItem>
              <MenuItem value="Devolução">Devolução</MenuItem>
              <MenuItem value="Reclamação">Reclamação</MenuItem>
              <MenuItem value="Entregas">Entregas</MenuItem>
              <MenuItem value="Pagamento">Pagamento</MenuItem>
              <MenuItem value="Outros">Outros temas</MenuItem>
            </s.ContactSelect>
          </s.ContactFormControl>
        </s.FormRow>
        <s.FormRow>

          <s.ContactFormControl>
            <TextField
              id="text"
              label="Digite sua mensagem"
              multiline={true}
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={4}
              maxLength="1000"
              rowsMax={6}
            />
          </s.ContactFormControl>
        </s.FormRow>
        <s.ContactButton>Enviar</s.ContactButton>
      </s.ContactForm>
      </Container>
    </s.ContactSection>
  );
};

ContactForm.propTypes = {
  contact: PropTypes.object
};

export default ContactForm;
