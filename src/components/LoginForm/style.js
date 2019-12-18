import styled from "styled-components";
import { Col, Container } from "react-grid-system";
import { FormControl } from "@material-ui/core";
import Link from "components/Link";


export const LoginSection = styled(Container)`
  text-align:center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0 100px;
  width: 100%;
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
export const Form = styled(Col)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
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

export const SLink = styled(Link)`
  margin-top: 15px;
  font-size: .8rem;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 15px;
  font-weight: 900;
  font-size: .9rem;
  text-transform: uppercase;
`;


