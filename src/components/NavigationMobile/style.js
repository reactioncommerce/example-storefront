import styled from "styled-components";

export const Container = styled.div`
  flex: 0 0 auto;
  font-family: ${({ theme }) => theme.typography.fontFamily};

  button {
    display: flex;
    align-items: center;
    width: 100%;
    background: transparent;
    color: #4f4d4d;
    border: none;
    user-select: none;
    outline: none;
  }
`;

export const Header = styled.div`
  padding: 0px 30px;
`;

export const Footer = styled.div`
  margin-top: 30px;
`;

export const LinkContainer = styled.div`
  margin-bottom: 5px;
  padding: 0px;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 41px;
    font-size: 16px;
    outline: none;
    padding: 0px 30px;
    color: "blue";
    font-size: 14px;

    svg {
      margin-left: -5px;
      margin-right: 20px;
    }
  }
`;
