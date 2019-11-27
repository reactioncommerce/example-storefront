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
  max-height: 240px;
  width: 100%;
  max-width: 360px;
  min-width: 250px;
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
