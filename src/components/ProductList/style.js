import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const Section = styled.section`
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  padding: 30px 0px;

  @media (min-width: ${breakpoints.md}) {
    padding-top: 70px;
    padding-bottom: 0px;
  }

  .slick-track {
    display: flex;
    margin-top: 30px;
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
  padding: 0px 48px 0px 48px;
  text-align: center;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_1};
  }
`;

export const SectionDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.typography.colors.secondary};
  margin-top: 20px;
  line-height: 1.67;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_4};
    width: 75%;
  }
`;

export const Product = styled.div`
  min-height: 250px;
  height: auto;
  width: 157px;
`;

export const ImageContainer = styled.div`
  height: ${({ desktopMode }) => (desktopMode ? "358px" : "214px")};
  width: ${({ desktopMode }) => (desktopMode ? "260px" : "156px")};
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
  margin-top: ${({ desktopMode }) => (desktopMode ? "20px" : "25px")};
  margin-bottom: ${({ desktopMode }) => (desktopMode ? "40px" : "")};
  font-size: ${({ desktopMode }) => (desktopMode ? "16px" : "10px")};
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
  font-size: ${({ desktopMode, theme }) => desktopMode && theme.typography.sizes.text.SIZE_3};
`;

export const DesktopContainerList = styled.ul`
  margin: 0px;
  padding: 75px 125px;
  padding-bottom: 0px;
  list-style: none;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
`;

export const DesktopProduct = styled.li`
  float: left;
  height: auto;
  width: 260px;
`;

export const BreakLine = styled.div`
  flex-basis: 100%;
  width: 0px;
  height: 0px;
  overflow: hidden;
`;
