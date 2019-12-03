import styled from "styled-components";

export const LoginSection = styled.section`
  text-align:center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:  50px 0;
`;

export const Logo = styled.img`

`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.gray.COLOR_2};
`;

export const Input = styled.input`
  
`;

export const Button = styled.button`
  margin-top: 25px;
  
`;

export const Link = styled.a`
  margin-top: 15px;
  font-size: .8rem;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 15px;
  font-weight: 900;
  font-size: .8rem;
`;

export const ForgotPassword = styled.a`
  
`;

