import styled from "styled-components";

export const Items = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  width: 35%;
  margin: 0px 20px;

  @media (min-width: 1066px) {
    margin-left: 40px;
  }

  a {
    padding: 10px;
    color: ${({ theme }) => theme.typography.colors.secondary};
  }
`;
