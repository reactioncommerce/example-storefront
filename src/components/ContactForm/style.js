import styled from "styled-components";
import { Input, FormControl, InputLabel } from "@material-ui/core";

export const ContactSection = styled.section`
  background: ${({ theme }) => theme.colors.special};
  margin: 0 -24px;
  padding: 24px;
  text-align:center;
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormRow = styled.div`
  margin: 10px 0!important;
  width:100%;

`;

export const ContactInput = styled(Input)`
  width:100%;
  padding-left: 15px;
`;

export const ContactInputLabel = styled(InputLabel)`
  left: 10px!important;
`;

export const ContactFormControl = styled(FormControl)`
  background: #fff!important;
  width:100%;

`;

export const Title = styled.h2`

`;
export const ContactButton = styled.button`
  max-width: 130px;
  background: ${({ theme }) => theme.colors.secondary };
  border: none;
  padding: 15px 20px;
  color: #fff;
  font-weight:900;
  margin-top: 20px;
  border-radius: 30px;  
`;

export const Description = styled.p`

`;
