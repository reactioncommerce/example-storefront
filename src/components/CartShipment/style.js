import styled from "styled-components";
import { Col } from "react-grid-system";

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px!important;
  flex-direction: column;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  padding: 7px 0;
  border: none;
  border-radius: 5px;
  width: 45px;
`;

export const Span = styled.span`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
`;
