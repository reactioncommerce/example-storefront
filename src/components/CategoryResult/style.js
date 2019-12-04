import styled from "styled-components";

export const CategoryResults = styled.ul`
  text-align:left;
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  margin: 0 -24px;
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

export const Product = styled.li`
  width: 48%;
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
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 100%;
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
    width: 40%;
    border-bottom: 1px solid #333;
    left: 35px;
    position: absolute;
    top: auto;
    bottom: auto;
  }
  
`;

export const SpecialPrice = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray.COLOR_2};

  
`;

export const Span = styled.span`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.colors.secondary};
  
`;

export const Pagination = styled.div`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.colors.secondary};
  
`;
