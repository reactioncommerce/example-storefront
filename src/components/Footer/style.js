import styled from "styled-components";

export const Container = styled.footer``;

export const UpsideContent = styled.div`
  background-color: ${({ theme }) => theme.layout.colors.secondary};
  height: auto;
  color: ${({ theme }) => theme.typography.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 15px;
`;

export const FollowOnChannels = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  margin: 40px 0px 20px 0px;
`;

export const SocialIcons = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  svg {
    height: 24px;
    width: 24px;
  }

  .youtube-icon {
    height: 27px;
    width: 27px;
  }
`;

export const MiddleContent = styled.div`
  background-color: ${({ theme }) => theme.layout.colors.primary};
  height: auto;
  color: ${({ theme }) => theme.typography.colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 30px;
`;

export const ContentBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_4};
  margin-bottom: 20px;
`;

export const InnerImages = styled.div`
  width: 100%;
  max-width: 285px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -20px 10px 0px 10px;
`;

export const BrandIcon = styled.img`
  margin-right: 8px;
  margin-top: 20px;
`;

export const UnboxLogo = styled.img`
  margin-top: 5px;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.layout.colors.tertiary};
  padding: 20px 20px 30px 20px;
`;

export const BrandLogo = styled.img``;

export const InnerInfo = styled.span`
  color: ${({ theme }) => theme.typography.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_5};
  line-height: 20px;
  text-align: center;
  max-width: 335px;
`;
