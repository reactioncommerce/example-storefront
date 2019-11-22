import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: padding-bottom 500ms;
  padding-bottom: ${({ isOpen }) => (isOpen ? "0px" : "20px")};

  width: 100%;
`;

export const InlineContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.span`
  text-align: center;
  width: 220px;
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
`;

export const HiddenContent = styled.div`
  overflow: hidden;
  transition: max-height 500ms;
  max-height: ${({ visible }) => (visible ? "200px" : "0px")};
`;

export const ListOfLinks = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  height: 100%;
  list-style: none;
  margin-left: -5px;
`;

export const LinkItem = styled.li`
  padding: 5px;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
`;
