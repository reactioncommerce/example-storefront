import styled, { css } from "styled-components";
import { Col, Row, Container, Hidden } from "react-grid-system";
import { breakpoints } from "../../helpers/constants";
import Slider from "react-slick";

const dotStyle = css`
  opacity: 1;
  width: 8px;
  height: 8px;
  margin-left: 5px;
  border-radius: 1px;
`;

export const Section = styled(Row)`
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  padding-top: 20px;
  padding-bottom: 50px;
  .slick-slider {
    .slick-arrow {
      display: none !important;
    }
  }

  .slick-dots {
    bottom: -35px;
    li {
      margin: 0px;
    }
    button {
      ::before {
        color: #cecece;
        ${dotStyle}
      }
    }

    .slick-active {
      button {
        ::before {
          color: ${({ theme }) => theme.typography.colors.price};
          ${dotStyle}
          transform: scale(1.1);
        }
      }
    }
  }
  @media (min-width: ${breakpoints.md}) {
    background: #f1f1f1;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 80px 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ImageContainer = styled.div`
  background: ${({ src }) => (src ? `url(${src})` : "")};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 42px;
  width: 50px;
`;

export const InnerTitle = styled.span`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  color: ${({ theme }) => theme.typography.colors.price};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
`;

export const InnerSubTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.SEMI};
  width: 160px;
  margin-top: 5px;
  line-height: 1.33;
  text-align: center;
`;

export const StyledCol = styled(Col)`
  text-align: center;
  &:not(:last-child) {
    border-right: 2px solid #c1c1c1;
  }
`;
export const StyledSmCol = styled(Col)`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const StyledHidden = styled(Hidden)`
width: 100%;
  &:not(:last-child) {
    border-right: 2px solid #c1c1c1;
  }
`;
