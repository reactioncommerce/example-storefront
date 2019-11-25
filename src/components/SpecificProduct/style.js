import styled from "styled-components";

export const Section = styled.section`
  height: 584px;
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.typography.colors.secondary};
`;

export const MainImage = styled.img`
  border: 1px solid red;
  height: 240px;
  width: 100%;
`;

export const InnerContent = styled.div`
  margin-top: 33px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
`;

export const Text = styled.span`
  margin-top: 21px;
  max-width: 240px;
  text-align: left;
  line-height: 20px;
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
`;

// export const Title = styled.span`
//   color: ${({ theme }) => theme.typography.colors.secondary};
//   font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
//   font-weight: ${({ theme }) => theme.typography.weights.BOLD};
//   text-align: center;
//   margin-bottom: 25px;
// `;

// export const TwoImagesLine = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// export const OneImageLine = styled.div`
//   display: flex;
//   margin: 10px 0px;
// `;

// export const Image = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: ${({ oneLine }) => (oneLine ? "124px" : "141px")};
//   width: ${({ oneLine }) => (oneLine ? "100%" : "50%")};
//   border: 1px solid green;
//   border-radius: 10px;
//   background-color: black;

//   :not(:first-of-type) {
//     margin-left: 10px;
//   }
// `;

// export const CategoryName = styled.span`
//   border: ${({ theme }) => `1px solid ${theme.typography.colors.tertiary}`};
//   border-radius: 25px;
//   width: 100px;
//   height: 33px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ theme }) => theme.typography.colors.tertiary};
//   font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
//   font-weight: ${({ theme }) => theme.typography.weights.BOLD};
//   background-color: rgba(255, 255, 255, 0.5);
// `;
