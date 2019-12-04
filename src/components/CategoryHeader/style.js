import styled from "styled-components";

export const CategoryHeader = styled.div`
  text-align:center;
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 24px;
  margin: 0 -24px;
  border-width: 1px 0 1px 0;
  border-color: #c1c1c1;
  border-style: solid;
`;

export const TotalVisible = styled.div`
  font-size: .8rem;
  padding: 0;
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
  flex-direction: row;
  display: flex;
  font-size: 1rem;
  &::after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000;
    content: "";
    margin-left: 5px;
    display:block;
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
