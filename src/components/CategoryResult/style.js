import styled from "styled-components";
import Slider from "react-slick";
import { Col, Row } from "react-grid-system";

export const CategoryResults = styled(Row)`
  text-align:left;
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-width: 1px 0 1px 0;
  border-color: #c1c1c1;
  flex-wrap:wrap;
  border-style: solid;
`;


export const Button = styled.button`
  position: absolute;
  left: auto;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: 900;
  right: auto;
  background: ${({ theme }) => theme.colors.primary};
  bottom: 15px;
`;

export const Product = styled(Col)`
  position: relative;
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  z-index: 3;
  height: auto;
`;

export const Description = styled.div`
  padding: 10px 0;
  position: relative;

`;

export const ProductImage = styled.div`
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  display:flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 100%;
  width: 100%;
`;

export const ProductTitle = styled.h3`
  margin: 5px 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
`;

export const Price = styled.h4`
  margin: 0;
  font-size: .9rem;
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.COLOR_4};
  margin: 5px 0;

  &::after {
    content: "";
    width: 30%;
    border-bottom: 1px solid #949494;
    left: 33px;
    position: absolute;
    top: auto;
    bottom: auto;
    margin-top: 2px;
  }
  
`;

export const SpecialPrice = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_2};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray.COLOR_2};

  
`;

export const Span = styled.span`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_2};
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 2px;
  
`;

export const Pagination = styled(Slider)`
  margin: 0 auto;
  padding: 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.colors.secondary};
  list-style: none;
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
`;

export const PaginationItem = styled.li`
  max-width: 30px;
  max-height: 30px;
  margin: 10px;
  padding: 7px 12px;
  border-radius: 5px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  
`;
