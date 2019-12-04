import styled, { css } from "styled-components";

const dotStyle = css`
  opacity: 1;
  width: 8px;
  height: 8px;
  margin-left: 5px;
  border-radius: 1px;
`;

export const Section = styled.section`
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  height: 230px;
  padding: 40px 0px;
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
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
