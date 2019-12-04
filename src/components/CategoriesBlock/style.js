import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const Section = styled.section`
  height: auto;
  padding: 41px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.layout.backgrounds.secondary};

  @media (min-width: ${breakpoints.md}) {
    padding-bottom: 60px;
  }
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  text-align: center;
  margin-bottom: 25px;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_1};
    margin-bottom: 45px;
  }
`;

export const TwoImagesLine = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 360px;
  min-width: 300px;
  width: 100%;
`;

export const OneImageLine = styled.div`
  display: flex;
  margin: 10px 0px;
  max-width: 360px;
  min-width: 300px;
  width: 100%;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ oneLine }) => (oneLine ? "124px" : "141px")};
  width: ${({ oneLine }) => (oneLine ? "100%" : "50%")};
  border-radius: 10px;
  background-color: #eee;

  :not(:first-of-type) {
    margin-left: 10px;
  }

  @media (min-width: ${breakpoints.md}) {
    height: ${({ twoImages }) => (twoImages ? "326px" : "327px")};
    width: ${({ twoImages }) => (twoImages ? "572px" : "365px")};

    :not(:first-of-type) {
      margin-left: 45px;
    }
  }
`;

export const CategoryName = styled.span`
  border: ${({ theme }) => `1px solid ${theme.typography.colors.tertiary}`};
  border-radius: 25px;
  width: 100px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.typography.colors.tertiary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  background-color: rgba(255, 255, 255, 0.5);
`;

export const TwoImagesDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
`;

export const ThreeImagesDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
  margin-top: 45px;
`;
