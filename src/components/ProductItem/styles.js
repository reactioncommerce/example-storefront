export const styles = (theme) => ({
  root: {},
  productInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10
  },
  productMedia: {
    backgroundColor: theme.palette.primary.contrastText,
    position: "relative"
  },
  link: {
    ...theme.typography.body2,
    "textAlign": "left",
    "&:hover": {
      color: theme.palette.secondary.main
    }
  }
});
