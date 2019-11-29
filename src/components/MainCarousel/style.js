import styled, { css } from "styled-components";

const dotStyle = css`
  background: white;
  content: "";
  opacity: 1;
  width: 8px;
  height: 8px;
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
  /* border-radius: 3px;
  height: auto;
  width: 157px; */
`;

export const ImageContainer = styled.div`
  /* width: 156px;
  height: 166px; */
  height: 345px;
  position: relative;
  background: ${({ src }) => (src ? `url(${src})` : "")};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

export const InnerTitle = styled.span``;

export const InnerDescription = styled.span``;
