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
  border-radius: 3px;
  height: auto;
  width: 157px;
`;

export const ImageContainer = styled.div`
  width: 156px;
  height: 166px;
  position: relative;
  background: ${({ src }) => (src ? `url(${src})` : "")};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;
