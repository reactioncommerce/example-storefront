import styled, { css } from "styled-components";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, InputLabel,  Select, MenuItem} from "@material-ui/core";
import { breakpoints } from "../../helpers/constants";

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_2};
  color: ${({ theme }) => theme.colors.gray.COLOR_3};
`;

export const StyledContainer = styled(Container)`
  border-top: 1px solid #c1c1c1;
  padding: 10px 0;
`;

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const StyledButton = styled.button`
    border-radius: 30px;
    text-transform: none;
    color: #fff;
    width: 100%;
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

export const Form = styled.form`
  background: #f1f1f1;
  `;