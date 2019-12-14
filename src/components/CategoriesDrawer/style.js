import styled from "styled-components";

export const Container = styled.div`
  flex: 0 0 auto;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  height: 432px;
  max-height: 432px;
  padding: 55px 125px;
`;

export const Content = styled.div`
  height: 335px;
  display: flex;
`;

export const Left = styled.div`
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
  opacity: 0.2;
  border: none;
  border-bottom: 1px solid;
  margin-top: 15px;
  margin-bottom: 50px;
  width: 45%;
`;

export const TagList = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

export const Tag = styled.li`
  margin-bottom: 13px;
  width: 200px;

  a {
    display: inline-block;
    padding: 8px 8px 8px 10px;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition: background-color 200ms;
    outline: none;

    :hover {
      background-color: #d2f5f6;
    }
  }
`;

export const Right = styled.div`
  width: 50%;
`;

export const CategoryImage = styled.div`
  background: ${({ src }) => (src ? `url(${src})` : "")};
  height: 100%;
  width: auto;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: background-image 0.2s ease-in-out;

  a {
    font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_1};
    font-weight: ${({ theme }) => theme.typography.weights.BOLD};
    color: ${({ theme }) => theme.typography.colors.primary};
    margin-bottom: 20px;
    cursor: pointer;
  }
`;
