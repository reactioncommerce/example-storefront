import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const AccordionSection = styled.section``;

export const Title = styled.h2``;

export const AccordionItems = styled.ul`
  padding: 0px;
  list-style: none;
  text-align: center;
`;

export const Item = styled.li`
  padding: 25px 3px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.COLOR_4};
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  position: relative;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ItemTitle = styled.h4`
  padding: 0;
  text-align: center;
  width: 100%;
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_4};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
`;

export const ItemText = styled.p`
  padding: 0;
  overflow: hidden;
  height: 0;
  margin: 0px;
    @media (min-width: ${breakpoints.md}) {
    text-align: left;

    }
  transition: all 0.3s;
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.NORMAL};

  &.active {
    margin: 20px 0 5px;
    transition: all 0s;
    padding: 20px 0 5px;
    min-height: 135px;
    height: auto;
  }
`;

export const ItemButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 100%;
  background: none;
  height: 25px;
  width: 25px;
  max-height: 25px;
  font-size: 1.2rem;
  line-height: 0.5rem;
  max-width: 25px;
  font-weight: 900;
  padding: 0;
  position: absolute;
  right: 25px;
  top: 20px;
  cursor: pointer;

  &.active {
    width: 40px;
  }
`;

export const ItemIcon = styled.i`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const InlineText = styled.span`
  display: block;
  text-align: left;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.NORMAL};
`;
