import styled, { css } from "styled-components";
import { Col, Row, Container } from "react-grid-system";
import { Input, FormControl, InputLabel,  Select, MenuItem} from "@material-ui/core";
import { breakpoints } from "../../helpers/constants";

export const ResumeTitle = styled.h2`
  font-size: ${({ theme }) => theme.sizes.title.SIZE_4};
  `;

export const ResumeSubtitle = styled.h4`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
  font-weight: 300;
  `;
export const StyledCol = styled(Col)`
  padding: 20px 30px!important;
`;
export const StyledContainer = styled(Container)`
  background: #fafafa;
`;

export const Total = styled.h2`
  font-size: ${({ theme }) => theme.sizes.title.SIZE_4};
  font-weight: 700;
  `;


export const Price = styled.span`
color: ${({ theme }) => theme.colors.secondary};
font-weight: 700;
`;
export const StyledRow = styled(Row)`
`;