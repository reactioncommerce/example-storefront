import styled from "styled-components";

export const SearchField = styled.div`
  display: flex;
  justify-content: ${({ desktopMode }) => (desktopMode ? "center" : "")};
  width: 100%;
  height: 64px;
  transition: margin-top 200ms;

  margin-top: ${({ stayOpened, desktopMode }) => (stayOpened && !desktopMode ? "10px" : "0px")};

  :focus-within {
    margin-top: ${({ desktopMode }) => (desktopMode ? "" : "10px")};
  }

  input {
    font-size: 16px;
    width: 250px;
  }

  .search-input {
    div {
      :first-of-type {
        ::before,
        ::after {
          border-color: ${({ theme }) => theme.typography.colors.price};
        }
      }
    }
  }
`;
