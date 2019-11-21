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
  font-size: ${({ theme }) => theme.layout.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.layout.weights.BOLD};
  margin: 20px 0px;
`;

export const SocialIcons = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  svg {
    height: 24px;
    width: 24px;
  }

  .youtube-icon {
    height: 27px;
    width: 27px;
  }
`;
