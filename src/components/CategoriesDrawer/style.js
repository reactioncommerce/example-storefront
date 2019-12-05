import styled from "styled-components";

export const Container = styled.div`
  flex: 0 0 auto;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  height: 432px;
  max-height: 432px;
  padding: 55px 125px;
`;

export const Content = styled.div`
  border: 1px solid red;
`;

export const Left = styled.div`
  border: 1px solid green;
  width: 50%;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  color: ${({ theme }) => theme.typography.colors.secondary};
  margin-left: 10px;
`;

export const Divider = styled.div`
  border-color: #999999;
  opacity: 0.4;
  border: none;
  border-bottom: 1px solid;
  margin-top: 15px;
  margin-bottom: 50px;
  width: 50%;
`;
