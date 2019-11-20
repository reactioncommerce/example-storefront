import styled from "styled-components";

export const SearchField = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  transition: margin-top 200ms;

  margin-top: ${({ stayOpened }) => (stayOpened ? "10px" : "0px")};

  :focus-within {
    margin-top: 10px;
  }

  input {
    font-size: 16px;
    width: 250px;
  }
`;
