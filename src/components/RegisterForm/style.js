import styled from "styled-components";
import { Input, FormControl, FormControlLabel } from "@material-ui/core";
import { Col } from "react-grid-system";

export const LoginSection = styled(Col)`
  text-align:center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0 100px;
`;

export const Logo = styled.img`
  max-width:120px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.gray.COLOR_3};
  margin: 40px 0;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled(Input)`
  width: 100%;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  text-align: left;
  margin: 10px 0;
`;

export const Button = styled.button`
  color: #fff;
  font-weight: 900;
  margin: 25px auto 0;
  background: ${({ theme }) => theme.colors.primary};
  padding: 15px 100px;
  border-radius: 20px;
  border: none;
`;


