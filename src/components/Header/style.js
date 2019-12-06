import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 9;
  background: #fff;
`;

export const Content = styled.div`
  box-shadow: 0 0px 10px rgba(0, 0, 0, .1);
  display: flex;
  position: relative;
  z-index: 9;
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
  justify-content: space-around;
  align-items: center;
  padding: 0px 5%;
`;

export const DesktopIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 120px;
  margin-left: 20px;
  @media (min-width: 1066px) {
    margin-left: 60px;
  }

  a {
    margin-top: 5px;
  }

  button {
    padding: 0px;
  }
`;
