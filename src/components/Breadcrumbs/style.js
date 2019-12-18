import styled from "styled-components";

export const BreadcrumbContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1140px;

  a:last-of-type {
    color: ${({ theme }) => theme.typography.colors.price};
  }
`;

export const BreadcrumbLink = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.typography.colors.secundary};
  border: 0;
  text-decoration: none;
  margin: 0 7px;
`;

export const BreadcrumbSeparator = styled.span`
  margin: 0 2px;
`;
