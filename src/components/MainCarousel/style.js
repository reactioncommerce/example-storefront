import styled, { css } from "styled-components";

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

  .slick-dots {
    bottom: 30px;
    left: 15px;
    width: 100%;
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
`;

export const InnerTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  color: ${({ theme }) => theme.typography.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  margin-top: 100px;
`;

export const InnerDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  color: ${({ theme }) => theme.typography.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.SEMI};
  width: 290px;
  margin-top: 15px;
  line-height: 1.5;
`;
