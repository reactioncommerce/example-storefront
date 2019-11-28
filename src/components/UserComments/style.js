import styled, { css } from "styled-components";

const ArrowStyle = css`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Section = styled.section`
  height: 377px;
  padding-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #e6feff;
  color: ${({ theme }) => theme.typography.colors.secondary};
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  margin-bottom: 40px;
`;

export const Slider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const ArrowLeft = styled.div`
  ${ArrowStyle}
`;

export const ArrowRight = styled.div`
  ${ArrowStyle}
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: row;
  height: 220px;
  width: 70%;
  box-shadow: 0 17px 21px 0 rgba(67, 147, 150, 0.22);
  overflow-x: hidden;
`;

export const CommentCard = styled.div`
  min-width: 100%;
  height: 250px;
  margin-top: 20px;
  transition: transform 500ms;
  transform: ${({ position }) => (position ? `translateX(${position})` : "")};
`;

export const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.layout.backgrounds.primary};
  min-width: 100%;
  height: 100%;
  padding: 15px;
`;

export const ImageBorder = styled.div`
  border: 1px solid #00c3cb;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
  position: absolute;
  left: 42%;
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
