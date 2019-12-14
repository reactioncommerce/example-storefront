import styled from "styled-components";

export const Navigation = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  background-color: #fff;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  padding: 0px 30px;

  button {
    display: flex;
    align-items: center;
    width: 100%;
    background: transparent;
    color: ${({ theme }) => theme.typography.colors.secondary};
    border: none;
    user-select: none;
    outline: none;
  }
`;

export const BackButton = styled.button`
  height: 80px;
  svg {
    margin-left: -5px;
  }
`;

export const BackButtonText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_2};
  color: ${({ theme }) => theme.typography.colors.secundary};
  margin-left: 15px;
`;

export const CategoryBlock = styled.div`
  margin-bottom: 30px;
`;

export const CategoryName = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.typography.colors.secondary};
`;

export const CategoryImage = styled.div`
  background: ${({ src }) => (src ? `url(${src})` : "")};
  height: 215px;
  width: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: background-image 0.2s ease-in-out;
  margin-top: 15px;
`;

export const ShowAll = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.text.SIZE_3};
  font-weight: ${({ theme }) => theme.typography.weights.BOLD};
  color: ${({ theme }) => theme.typography.colors.primary};
  margin-bottom: 10px;
  cursor: pointer;
`;
