import styled, { css } from "styled-components";
import { breakpoints } from "../../helpers/constants";

const dotStyle = css`
  background: white;
  content: "";
  opacity: 1;
  width: 6px;
  height: 6px;
  margin-left: 5px;
  border-radius: 1px;
`;

export const Section = styled.section`
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};

  .slick-slider {
    .slick-arrow {
      display: none !important;
    }
  }

  .slick-dots {
    bottom: 30px;
    left: 15px;
    width: 95%;
    height: auto;

    button {
      padding: 10px;
      ::before {
        ${dotStyle}
      }
    }

    .slick-active {
      button {
        ::before {
          ${dotStyle}
          transform: scale(2);
        }
      }
    }
  }
`;
export const Product = styled.div`
  position: relative;
`;

export const ImageContainer = styled.div`
  height: ${({ fullPage }) => (fullPage ? "calc(100vh - 83px)" : "345px")};
  position: relative;
  background: ${({ src }) => (src ? `url(${src})` : "")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

export const TextBlock = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    top: 0px;
    bottom: 0px;
  }
`;

export const InnerTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  color: ${({ theme }) => theme.typography.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  margin-top: 100px;

  @media (min-width: ${breakpoints.md}) {
    font-size: 48px;
  }
`;

export const InnerDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.typography.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.SEMI};
  width: 290px;
  margin-top: 15px;
  line-height: 1.5;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_4};
    font-weight: ${({ theme }) => theme.typography.weights.NORMAL};
    width: 80%;
  }
`;
