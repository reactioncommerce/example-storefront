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
  localeItem: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    minWidth: 0
  },
  textGrey: {
    color: "red",
    fontSize: 12,
    fontWeight: 400,
    minWidth: 0
  },
  localeContainer: {
    marginLeft: -24,
    marginRight: -24,
    marginBottom: -10
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
        id="locale-select"
        value={locale}
        onChange={event => changeLanguage(event.target.value)}
    >
        { locales.map(( locale, index ) => <MenuItem key={index} value={locale}>{t(locale)}</MenuItem> )}
  </Select>
  );

  return (
    <Grid container spacing={0} justify="flex-end" className={classes.localeContainer}>
      <Grid item xs={6} sm={2} md={1}
        className={classes.localeItem}
      >
        <Button color="primary" className={locale === "de" && classes.text || classes.textGrey} onClick={() => changeLanguage("de")}>
          DE
        </Button>
        <Typography className={classes.textGrey} variant="body1" align="center">
          /
        </Typography>
        <Button color="primary" className={locale === "en" && classes.text || classes.textGrey} onClick={() => changeLanguage("en")}>
          EN
        </Button>
      </Grid>
    </Grid>
  );
};

export default LocaleDropdown;