import styled, { css } from "styled-components";
import { Row } from "react-grid-system";
import { breakpoints } from "../../helpers/constants";

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
  color:  ${({ theme }) => theme.colors.gray.COLOR_4};
  width: 100%;
`;

export const Form = styled.form`
`;

export const StyledRow = styled(Row)`
  border-bottom: 1px solid #f1f1f1;
  padding: 15px 0;
`;
export const StyledButton = styled.button`
    border-radius: 30px;
    text-transform: none;
    color: #fff;
    width: 320px;
    margin: 10px 0;
    height: 45px;
`;

const primaryButtonStyle = css`
  background-color: ${({ theme }) => theme.typography.colors.tertiary};
  color: ${({ theme }) => theme.typography.colors.primary};
  border:none;

  :hover {
    background-color: #661875;
    border-color: #661875;
    box-shadow: none;
  }
`;

const secondaryButtonStyle = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  :hover {
    background-color: #00969c;
    box-shadow: none;
  }
`;

export const Button = styled(StyledButton)`
    border-radius: 20px;
    text-transform: none;
    font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
    font-weight: ${({ theme }) => theme.typography.weights.BOLD};

    @media (min-width: ${breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
    }

    ${({ primary }) => primary && primaryButtonStyle};

    ${({ secondary }) => secondary && secondaryButtonStyle};

  }
`;
