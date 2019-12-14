import styled from "styled-components";

export const Tabs = styled.section`
  padding: 20px 0;
`;

export const TabsHead = styled.ul`
  list-style: none;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const TabsHeadItem = styled.li`
  width: 33%;
  display:flex;
  height:35px;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray.COLOR_5};
  }

`;

export const TabButton = styled.button`
  width: 100%;
  height: 100%;
  text-align:center;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
`;

export const ButtonValue = styled.h4`
  font-size:${({ theme }) => theme.sizes.title.SIZE_4}; 
  font-weight:900;
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: capitalize;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TabsContent = styled.ul`
  list-style: none;
  padding: 0;

`;

export const Tab = styled.li`
  display: none;
  &.active {
    display:block;
  }
`;

export const TabImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  overflow:hidden;

`;

export const TabText = styled.p`
  
`;

