import styled from "styled-components";

export const AccordionSection = styled.section`

`;

export const Title = styled.h2`

`;

export const AccordionItems = styled.ul`
  padding: 0;
  list-style: none;
`;

export const Item = styled.li`
  padding: 25px 3px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.COLOR_4};
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;

`;
export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;

`;

export const ItemTitle = styled.h4`
  padding: 0;
  margin: 0;
`;

export const ItemText = styled.p`
  padding: 0;
  margin: 5px 0 5px;
  display: none;
  &.active {
      display: block;
  }
`;

export const ItemButton = styled.button`
  border:1px solid ${({ theme }) => theme.colors.primary};
  color:${({ theme }) => theme.colors.primary};
  border-radius: 100%;
  background: none;
  height: 25px;
  width: 25px;
  max-height: 25px;
  font-size: 1.2rem;
  line-height: 1.6rem;
  max-width: 25px;
  font-weight:900;
  padding:0;
  &.active {
    width: 40px;
  }
`;

export const ItemIcon = styled.i`
  font-weight:900;
`;

