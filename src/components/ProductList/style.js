import styled from "styled-components";

export const Section = styled.section`
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  padding: 30px 0px;
  .slick-track {
    display: flex;
  }
  .slick-slide {
    padding: 0 8px;

    :first-of-type {
      .product-item {
        margin-left: 20px;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 48px 30px 48px;
  text-align: center;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
`;

export const SectionDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.typography.colors.secondary};
  margin-top: 20px;
  line-height: 1.67;
`;

export const Product = styled.div`
  min-height: 250px;
  height: auto;
  width: 157px;
`;

export const ImageContainer = styled.div`
  width: 156px;
  height: 214px;
  position: relative;
  background: ${({ src }) => (src ? `url(${src})` : "")};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_5};
`;

export const ProductName = styled.span`
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.SEMI};
`;

export const ProductPrice = styled.span`
  color: ${({ theme }) => theme.typography.colors.price};
  margin-top: 5px;
`;

export const ProductInnerDescription = styled.span`
  color: ${({ theme }) => theme.typography.colors.tertiary};
`;