import styled, { css } from "styled-components";

const primaryButtonStyle = css`
  background-color: ${({ theme }) => theme.typography.colors.tertiary};
  color: ${({ theme }) => theme.typography.colors.primary};

  :hover {
    background-color: #661875;
    border-color: #661875;
    box-shadow: none;
  }
`;

const secondaryButtonStyle = css`
  background-color: ${({ theme }) => theme.layout.colors.secondary};
  color: ${({ theme }) => theme.typography.colors.primary};

  :hover {
    background-color: #00969c;
    border-color: #00969c;
    box-shadow: none;
  }
`;

export const Button = styled.div`
  a,
  button {
    border-radius: 20px;
    text-transform: none;
    font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
    font-weight: ${({ theme }) => theme.typography.weights.BOLD};
    width: 87px;
    height: 35px;

    ${({ primary }) => primary && primaryButtonStyle};

    ${({ secondary }) => secondary && secondaryButtonStyle};

    ${({ customStyles }) => customStyles};
  }
`;
