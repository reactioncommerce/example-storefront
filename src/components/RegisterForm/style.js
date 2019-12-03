import styled from "styled-components";
import { Input, FormControl, FormControlLabel } from "@material-ui/core";

export const LoginSection = styled.section`
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
export const StyledInput = styled(Input)`
  width: 100%;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  text-align: left;
  margin: 10px 0;
`;

export const Button = styled.button`
  margin-top: 25px;
  width: 80%;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  padding: 10px 30px;
  border-radius: 10px;
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


