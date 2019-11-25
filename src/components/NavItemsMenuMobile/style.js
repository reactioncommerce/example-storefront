import styled from "styled-components";

export const Navigation = styled.nav`
  svg {
    height: 25px;
    width: 25px;
  }
`;

export const BackButton = styled.button`
  height: 80px;
  padding: 0px 30px;
  svg {
    margin-left: -5px;
  }
`;

export const BackButtonText = styled.span`
  font-size: 16px;
  margin-left: 15px;
`;

export const LinkContainer = styled.div`
  margin-bottom: 15px;
  padding: 0px;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 41px;
    font-size: 16px;
    color: #4f4d4d;
    outline: none;
    padding: 0px 30px;

    svg {
      margin-right: -5px;
    }
  }
`;
