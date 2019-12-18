import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";


export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;

    }

`;
export const Row = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.button`
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 5px 15px;
    background: transparent;
    font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
    border-radius: 5px;
    font-weight: 900;
    height: 45px;
    outline:none;
    &.active {
      background: ${({ theme }) => theme.colors.secondary};
      color: #fff;
      border-color: ${({ theme }) => theme.colors.secondary};
    }
    @media (min-width: ${breakpoints.md}) {
      width: 100%;

    }
`;
