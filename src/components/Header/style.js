import styled from "styled-components";

export const Container = styled.div`
  z-index: 99;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.21);
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

  .cart-icon {
    span {
      background-color: ${({ theme }) => theme.typography.colors.tertiary};
    }
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

export const DesktopHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const DesktopIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
  margin-left: 45px;

  a {
    margin-top: 5px;
  }

  button {
    padding: 0px;
  }
`;
