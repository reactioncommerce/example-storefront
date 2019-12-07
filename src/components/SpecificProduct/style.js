import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const Section = styled.section`
  height: 584px;
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.typography.colors.secondary};

  @media (min-width: ${breakpoints.md}) {
    height: auto;
    flex-direction: row;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0px;
    align-items: center;
    padding-left: 25px;
    max-width: 1440px;
  }
`;

export const MainImageContainer = styled.div`
  @media (min-width: ${breakpoints.md}) {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    width: 52%;
  }
`;

export const MainImage = styled.img`
  max-height: 240px;
  width: 100%;
  max-width: 360px;
  min-width: 250px;

  @media (min-width: ${breakpoints.md}) {
    max-width: 721px;
    max-height: 544px;
  }
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 95px;
  @media (max-width: ${breakpoints.md}) {
    margin-top: 30px;
    margin-left: 60px;
  }
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_1};
  }
`;

export const Text = styled.span`
  margin-top: 21px;
  max-width: 240px;
  text-align: left;
  line-height: 20px;
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  min-width: 240px;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.title.SIZE_4};
    line-height: 1.36;
    min-width: 430px;
  }
`;
