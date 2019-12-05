import styled from "styled-components";
import { Select, FormControl, InputLabel } from "@material-ui/core";

export const CategoryHeader = styled.div`
  text-align:center;
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  margin: 0 -12px;
  border-width: 1px 0 1px 0;
  border-color: #c1c1c1;
  border-style: solid;
`;

export const TotalVisible = styled.div`
  font-size: .8rem;
  padding: 0;
`;

export const StyledFormControl = styled(FormControl)`

`;


export const StyledSelect = styled(Select)`

`;

export const StyledInputLabel = styled(InputLabel)`

`;

export const Visible = styled.span`
  font-weight: 900;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CategoryFilters = styled.ul`
  font-size: .8rem;
  padding: 15px 0;
  list-style: none;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  display: flex;
`;

export const FilterItem = styled.li`
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  display: flex;
  position: relative;
  font-size: 1rem;

`;

export const Dropdown = styled.ul`
  position: relative;
  width: 120px;
  right: 0;
  top: 0;
  list-style: none;
  height: 0;
  overflow: hidden;
  background: #f1f1f1;
  transition: all .3s;
  padding:0 5px;
  margin-top: 10px;
  display:flex;

  justify-content: space-between;
  flex-direction: column;
  align-items: center;

`;

export const DropdownItem = styled.li`
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
`;

export const Label = styled.label`
  &::after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000;
    position: absolute;
    right: 0px;
    top: 7px;
    bottom: auto;
    content: "";
    margin-left: 5px;
  }
`;

export const Input = styled.input`
  &:checked ~ ul {
    height: 90px;
    padding: 5px;
    transition: all .3s;
 }
`;


export const Title = styled.h2`
  position: absolute;
  width: 100%;
  top: auto;
  font-size: ${({ theme }) => theme.sizes.title.SIZE_4};
  bottom: auto;
  text-transform: uppercase;
  font-weight: 100;
  margin: 0;
  left: 0;
  text-align: center;
  padding: 0;
`;
