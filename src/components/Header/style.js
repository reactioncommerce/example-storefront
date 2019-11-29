import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 9;
  background: #fff

`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 63px;
  padding: 0px 25px;
  width: 100%;

  a {
    outline: none;
    user-select: none;
  }
`;

export const Logo = styled.img`
  height: 52px;
  width: 155px;
`;

export const ToggleButton = styled.button`
  border: none;
  background: transparent;
  padding: 0px;
  outline: none;
`;
