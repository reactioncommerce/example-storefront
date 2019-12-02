import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "../Icons/Search";
import * as styles from "./style";

const SearchField = ({ desktopMode }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <styles.SearchField desktopMode={desktopMode} stayOpened={searchText.length}>
      <FormControl className="search-input">
        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: "16px" }}>
          O que você está procurando?
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          disableUnderline={!desktopMode}
          onChange={(e) => setSearchText(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </styles.SearchField>
  );
};

SearchField.propTypes = {
  desktopMode: PropTypes.bool
};

SearchField.defaultProps = {
  desktopMode: false
};

export default SearchField;
