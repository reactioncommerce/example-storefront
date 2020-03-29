import React, { useCallback } from "react";
import Router, { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useStores from "hooks/useStores";
import { locales } from "translations/config";
import useTranslation from "hooks/useTranslation";

const useStyles = makeStyles((theme) => ({
  localeSelect: {
    margin: theme.spacing(0, 1),
    fontSize: "1rem"
  }
}));

const LocaleDropdown = () => {
  const classes = useStyles();
  const router = useRouter();
  const { locale, t } = useTranslation("common");
  const { uiStore } = useStores();

  const changeLanguage = useCallback(
    (language) => {
      const regex = new RegExp(`^/(${locales.join("|")})`);
      uiStore.setLanguage(language);
      Router.push(
        router.pathname,
        router.asPath.replace(regex, `/${language}`)
      );
    },
    [router]
  );

  return (
    <Select
      classes={{ root: classes.localeSelect }}
      id="locale-select"
      value={locale}
      onChange={event => changeLanguage(event.target.value)}
    >
        { locales.map(( locale, index ) => <MenuItem key={index} value={locale}>{t(locale)}</MenuItem> )}
  </Select>
  );
};

export default LocaleDropdown;