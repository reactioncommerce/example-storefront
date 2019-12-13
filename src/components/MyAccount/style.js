import styled from "styled-components";
import { FormControl } from "@material-ui/core";
import { Container, Col } from "react-grid-system";
import Button from "components/Button";
import Link from "components/Link";
import { breakpoints } from "../../helpers/constants";

export const MyAccountContainer = styled(Container)`
    padding: 30px 0;
`;

export const Title = styled.h3`
    text-align: center;
    font-weight:600;
`;

export const Svg = styled.svg`
    fill: #c1c1c1;
    width: 20px;
`;

export const Description = styled.p`
    font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
    text-align: center;

`;

export const SaveButton = styled.button`
    background: ${({ theme }) => theme.colors.secondary};
    margin: 20px 0;
    border: none; 
    padding: 10px;
    color: #fff;
    font-weight: 900;
    border-radius: 10px;
    @media (min-width: ${breakpoints.md}) {
      min-width: 230px;
    }
`;

export const StyledFormControl = styled(FormControl)`
    width: 100%;
    margin: 10px 0!important;
`;


export const Menu = styled(Col)`
    border-radius: 30px;
    flex-direction:column;
    padding: 0!important;
    display: flex;
`;

export const MenuItem = styled(Col)`
    border-radius: 20px;
    flex-direction:column;
    padding: 5px;
    display: flex;
`;

export const MenuIcon = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 10px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_1};
  align-items: flex-end;
  justify-content: flex-start;
  padding: 5px;
  &.active {
    background: #d2f5f6;
  }
`;