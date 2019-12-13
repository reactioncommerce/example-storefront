import styled, { css } from "styled-components";
import { Col, Row, Container } from "react-grid-system";
import { breakpoints } from "../../helpers/constants";

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.sizes.title.SIZE_4};
`;

export const StyledContainer = styled(Container)`
  width: 100%;
`;

export const StyledRow = styled(Row)`
  border-top: 1px solid #c1c1c1;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content:space-between;
  padding: 10px 0;
`;

export const Form = styled.form`
  background: #f1f1f1;
`;

export const StyledCol = styled(Col)`
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
`;

export const ImageBox = styled.div`
  height: 50px;
  border-radius: 7px;
  overflow: hidden;
`;

export const Image = styled.img`
  height: auto;
  width: 100%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
  margin: 0 0 0px;
  font-weight: 300;

`;

export const Variant = styled.span`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};

`;

export const Quantity = styled.h4`
  margin: 0 0 5px;
  font-weight: 100;
`;

export const QuantityCounter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  max-width: 80px;
  justify-content: space-between;
`;

export const CounterButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 900;
  font-size: ${({ theme }) => theme.sizes.title.SIZE_3};

`;
export const Price = styled.h3`
  margin: 20px 0 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight:900;

`;
export const Button = styled.button`
  border-radius: 100%;
  background: #c1c1c1;
  color: #fff;
  font-weight: 900;
  width: 20px;
  height: 20px;
  border: none;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  justify-content: space-between;
`;

export const Resume = styled(Col)`
  
`;

export const ResumeItem = styled.div`
`;
