import styled, { css } from "styled-components";
import { Col, Container, Row } from "react-grid-system";
import Slider from "react-slick";
import { breakpoints } from "../../helpers/constants";

export const Image = styled.img`
  height: auto;
  width: 100%;
  max-width: 100%;
`;

export const ImageCol = styled.div`
  height: 438px;
  overflow: hidden;
`;

export const StyledRow = styled(Row)`
  height: 100%;
  list-style: none;
  padding: 0;
`;

export const BreadCrumbContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  box-sizing: border-box;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledContainer = styled(Container)`
  background: #fff;
  padding: 0px;

  @media (min-width: ${breakpoints.md}) {
    padding: 40px;
    max-width: 1200px;
  }
`;

export const StyledCol = styled(Col)`
  height: 100%;
  border-left: 1px solid #c1c1c1;
`;

export const StyledSlider = styled(Slider)`
  width: 100%;
  list-style: none;
  padding: 0;

  .slick-dots {
    bottom: 20px;
  }
  .slick-dots li button:before {
    color: #fff;
  }
  .slick-dots li.slick-active button:before {
    color: #fff;
    transform: scale(1.3);
  }
  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
  .slick-prev,
  .slick-next {
    z-index: 6;
    margin: 0 5px;
  }
  .slick-slide {
    max-width: 330px;
  }
  @media (min-width: ${breakpoints.md}) {
  }
`;

export const Title = styled.h2`
  width: 100%;
  margin: 15px 0 25px;
  text-align: center;
  font-size: ${({ theme }) => theme.sizes.title.SIZE_3};
  color: ${({ theme }) => theme.colors.gray.COLOR_2};
`;

export const Price = styled.h4`
  width: 100%;
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.sizes.title.SIZE_5};
  color: ${({ theme }) => theme.colors.gray.COLOR_4};
  span {
    letter-spacing: 2px;
    position: relative;
    font-size: ${({ theme }) => theme.sizes.text.SIZE_2};
    height: 25px;
    &::after {
      content: "";
      width: 160%;
      border-bottom: 1px solid #959595;
      position: absolute;
      right: -5px;
      bottom: 8px;
      top: auto;
      align-self: center;
      justify-self: center;
    }
  }
`;

export const SpecialPrice = styled.h3`
  width: 100%;
  margin: 10px 0 30px;
  text-align: center;
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
`;

export const Span = styled.span`
  letter-spacing: 2px;
  font-size: ${({ theme }) => theme.sizes.title.SIZE_3};

  color: ${({ theme }) => theme.colors.secondary};
`;

export const StyledButton = styled.button`
  border-radius: 30px;
  text-transform: none;
  color: #fff;
  width: 320px;
  margin: 10px 0;
  height: 45px;
`;

const primaryButtonStyle = css`
  background-color: ${({ theme }) => theme.typography.colors.tertiary};
  color: ${({ theme }) => theme.typography.colors.primary};
  border: none;

  :hover {
    background-color: #661875;
    border-color: #661875;
    box-shadow: none;
  }
`;

const secondaryButtonStyle = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  :hover {
    background-color: #00969c;
    box-shadow: none;
  }
`;

export const Button = styled(StyledButton)`
    border-radius: 20px;
    text-transform: none;
    font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
    font-weight: ${({ theme }) => theme.typography.weights.BOLD};

    @media (min-width: ${breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
    }

    ${({ primary }) => primary && primaryButtonStyle};

    ${({ secondary }) => secondary && secondaryButtonStyle};

  }
`;
