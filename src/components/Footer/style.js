import styled from "styled-components";

export const Container = styled.footer``;

export const UpsideContent = styled.div`
  background-color: ${({ theme }) => theme.layout.colors.secondary};
  height: auto;
  color: ${({ theme }) => theme.typography.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
