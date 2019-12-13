import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { breakpoints } from "../../helpers/constants";

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px!important;
  flex-direction: column;
`;
export const StyledRow = styled(Row)`
    @media (min-width: ${breakpoints.md}) {
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid #f1f1f1;
    }
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
  margin-top: 20px;
`;
