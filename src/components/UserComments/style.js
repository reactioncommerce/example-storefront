import styled, { css } from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const Section = styled.section`
  height: auto;
  padding-top: 40px;
  /* padding-bottom: 40px; */
  background-color: #e6feff;
  color: ${({ theme }) => theme.typography.colors.secondary};
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_1};
    margin-bottom: 20px;
  }
`;

export const SubTitle = styled.span`
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_4};
  line-height: 1.36;
  width: 70%;
  text-align: center;
`;

export const SliderContainer = styled.div`
  text-align: center;
`;

export const CommentCard = styled.div`
  height: auto;
  width: 100%;
  max-width: 263px;
  position: relative;
  box-shadow: 0 44px 49px 0 rgba(67, 147, 150, 0.22);
  margin-bottom: 30px;
`;

export const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  min-width: 100%;
  height: 100%;
  padding: 15px;
  margin-top: 30px;
`;

export const ImageBorder = styled.div`
  border: 1px solid #00c3cb;
  z-index: 99;
  top: 0px;
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

export const UserImage = styled.img`
  border: 1px solid #00c3cb;
  height: 52px;
  width: 52px;
  border-radius: 50%;
`;

export const Text = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_5};
  color: #999999;
  line-height: 20px;
  margin-top: 40px;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 15px;
`;

export const Name = styled.span`
  color: ${({ theme }) => theme.layout.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
`;

export const Info = styled.span`
  margin-top: 5px;
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
`;

// export const Comments = styled.div`
//   display: flex;
//   flex-direction: row;
//   height: auto;
//   width: 70%;
//   box-shadow: 0 44px 49px 0 rgba(67, 147, 150, 0.22);
//   overflow-x: hidden;
// `;

// export const DesktopSlider = styled.div`
//   padding: 30px 0px;
//   width: 80%;
//   height: 360px;

//   .slick-track {
//     display: flex;
//   }
//   .slick-slide {
//     padding: 0 8px;

//     .product-item {
//       margin-right: 10px;
//     }
//   }

//   .slick-slider {
//     .slick-prev::before,
//     .slick-next::before {
//       font-size: 30px;
//       color: ${({ theme }) => theme.typography.colors.secondary};
//       opacity: 1;
//     }

//     .slick-prev {
//       left: -35px !important;
//       z-index: 999;
//     }

//     .slick-next {
//       right: -20px;
//       z-index: 999;
//     }
//   }
// `;

// export const DesktopCommentCard = styled.div`
//   border: 1px solid red;
//   height: 80%;
//   width: 355px !important;
// `;
