import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const MobileSection = styled.section`
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

export const DesktopSection = styled.section`
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  padding: 30px 0px;

  .slick-track {
    display: flex;
  }
  .slick-slide {
    padding: 0 8px;

    .product-item {
      margin-right: 10px;
    }
  }

  .slick-slider {
    .slick-prev::before,
    .slick-next::before {
      font-size: 30px;
      color: ${({ theme }) => theme.typography.colors.price};
      opacity: 1;
    }

    .slick-prev {
      left: -35px !important;
      z-index: 999;
    }

    .slick-next {
      right: -20px;
      z-index: 999;
    }
  }
`;

export const SliderContainer = styled.div`
  margin: 0 auto;
  width: 80%;
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
  border-radius: 3px;
  height: auto;
  width: auto;
  /* width: ${({ desktopMode }) => (desktopMode ? "auto" : "157px")}; */
`;

export const ImageContainer = styled.div`
  width: ${({ desktopMode }) => (desktopMode ? "263px" : "156px")};
  height: ${({ desktopMode }) => (desktopMode ? "276px" : "166px")};
  position: relative;
  background: ${({ src }) => (src ? `url(${src})` : "")};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;
