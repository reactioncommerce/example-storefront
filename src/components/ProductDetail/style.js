import styled from "styled-components";

export const Image = styled.img`
    width: 100%;
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.gray.COLOR_2};
  margin: 0 5px;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray.COLOR_2};
`;


