import styled from "styled-components";
import { Col } from "react-grid-system";
import { FormControl } from "@material-ui/core";

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

export const Input = styled.input`
  width: 100%;
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

export const Button = styled.button`
  color: #fff;
  font-weight: 900;
  margin: 25px auto 0;
  background: ${({ theme }) => theme.colors.primary};
  padding: 15px 100px;
  border-radius: 20px;
  border: none;
`;

export const Link = styled.a`
  margin-top: 15px;
  font-size: .8rem;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 15px;
  font-weight: 900;
  font-size: .9rem;
  text-transform: uppercase;
`;


