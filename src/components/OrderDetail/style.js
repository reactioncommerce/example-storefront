import styled, { css } from "styled-components";
import { Row, Col, Container } from "react-grid-system";
import { breakpoints } from "helpers/constants";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel } from "@material-ui/core";
import Link from "/components/Link";

export const StyledContainer = styled(Container)`
    background: #fff;
    padding: 30px 50px!important;
    &:last-child {
      border: none;
    }
`;
export const StyledRow = styled(Row)`
    border-bottom: 1px solid #c1c1c1;
    padding: 20px 0;
`;

export const StyledCol = styled(Col)`
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    display: flex;
    
    flex-direction:column;
`;

export const Buttons = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media (min-width: ${breakpoints.md}) {
      flex-direction: column;
      justify-content: flex-end;
    }
`;

export const IconButton = styled.button`
    background: transparent;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;  
  margin-right: 10px;
`;
export const Feedback = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 280px;

  label {
    height: 40px;
    width: 23px;
    font-weight: 900;
    color: #fff;
    text-align: center;
    justify-content: center;
    opacity: .9;
    display: flex;
    font-size: .9rem;
    border-radius: 7px;
    align-items: center;
    transition: all .3s;
    &:nth-of-type(1)  {
      background: #b72027!important;
    }
    &:nth-of-type(2)  {
      background: #c21e25!important;
    }
    &:nth-of-type(3)  {
      background: #d52027!important;
    }
    &:nth-of-type(4)  {
      background: #f05525!important;
    }
    &:nth-of-type(5)  {
      background: #f37022!important;
    }
    &:nth-of-type(6)  {
      background: #faa81e!important;
    }
    &:nth-of-type(7)  {
      background: #fecb22!important;
    }
    &:nth-of-type(8)  {
      background: #f8f01f!important;
    }
    &:nth-of-type(9)  {
      background: #e9e73c!important;
    }
    &:nth-of-type(10)  {
      background: #C6D82C!important;
    }
    &:nth-of-type(11)  {
      background: #83C470!important;
    }
  }
  
  input:checked + label { 
    transform: scale(1.1);
    transition: all .3s;
    opacity: 1;
    font-size: 1.3rem;
    line-height: 1.3rem;
  }
  > input  {
    display: none;
  }      
`;

export const StyledLabel = styled.label`
  margin: 0 !important;
`;

export const StyledRadioGroup = styled(RadioGroup)`
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    display: flex;
    flex-direction:row!important;
`;

export const ImageBox = styled.div`
  height: 90px;
  border-radius: 7px;
  width: 90px;
  overflow: hidden;
`;

export const Image = styled.img`
  height: auto;
  width: 100%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
  margin: 0 0 0px;
  font-weight: 300;
`;

export const PageTitle = styled.h4`
  font-size: ${({ theme }) => theme.sizes.title.SIZE_3};
  margin: 0 0 0px;
  font-weight: 900;
  width: 100%;
  text-align: center;
`;

export const Variant = styled.p`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  margin: 5px 0;
`;

export const Price = styled.h3`
  margin: 20px 0 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight:900;
`;

export const StyledButton = styled.button`
    border-radius: 30px;
    text-transform: none;
    color: #fff;
    width: 100%;
    margin: 30px 0 0;
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
  color: #fff;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.secondary};;
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

`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  justify-content: space-between;
`;
export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  text-align: center;
  max-width: 280px;

  @media (min-width: ${breakpoints.md}) {
     text-align: left;
    }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  margin-top: 15px;
  padding: 15px;
  border-radius: 7px;
`;

const successSpanStyle = css`
  color:  #49cb00;
`;

const canceledSpanStyle = css`
  color:  #cb0000;
`;

const processSpanStyle = css`
  color:  #ff9c03;
`;

export const Span = styled.span`
    border-radius: 20px;
    text-transform: none;
    font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
    font-weight: ${({ theme }) => theme.typography.weights.BOLD};

    @media (min-width: ${breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
    }

    ${({ success }) => success && successSpanStyle};
    ${({ canceled }) => canceled && canceledSpanStyle};
    ${({ process }) => process && processSpanStyle};
`;

export const Menu = styled(Col)`
    border-radius: 20px;
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
  margin:0 10px;
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

export const StyledList = styled.ul`
  padding: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.secondary};
  list-style:none;

  li {
      position: relative;
      margin: 10px 0;
      padding: 15px 25px;
    &.active {
      &::before {
        transform: scale(1.3);
      }
      &::after {
        content: "";
      width: 25px;
      height: 25px;
      border-radius: 100%;
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      display: block;
      left: -13px;
      top: 7px;
      position: absolute;
      z-index: -1;
      }
    }
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: ${({ theme }) => theme.colors.secondary};
      display: block;
      left: -6px;
      top: auto;
      bottom: auto;
      position: absolute;
    }
  }

  @media (min-width: ${breakpoints.md}) {
   flex-direction: row;
   border-left: none;
   display: flex;
   border-top: 1px solid ${({ theme }) => theme.colors.secondary};
   li {
     display: flex;
     align-items: center;
     justify-content: center;
     
     &.active {
      &::before {
        transform: scale(1.3);
      }
      &::after {
        content: "";
      width: 25px;
      height: 25px;
      border-radius: 100%;
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      display: block;
      left: auto;
      right: auto;
      top: -15px;
      position: absolute;
      z-index: -1;
      }
    }
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: ${({ theme }) => theme.colors.secondary};
      display: block;
      right: auto;
      top: -15px;
      left: auto;
      position: absolute;
    }
   }
  }

`;