import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "../Icons/Search";
import * as styles from "./style";

const SearchField = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <styles.SearchField stayOpened={searchText.length}>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">O que você está procurando?</InputLabel>
        <Input
          id="input-with-icon-adornment"
          disableUnderline={true}
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

export default SearchField;
