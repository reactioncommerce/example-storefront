export const styles = (theme) => ({
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(-360deg)" }
  },
  "root": {},
  "productInfo": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10
  },
  "productMedia": {
    backgroundColor: theme.palette.primary.contrastText,
    position: "relative"
  },
  "img": {
    height: "auto",
    width: "100%"
  },
  "imgLoading": {
    alignItems: "center",
    backgroundColor: "transparent",
    display: "flex",
    fontSize: 48,
    height: 100,
    justifyContent: "center",
    left: "calc(50% - 50px)",
    position: "absolute",
    top: "calc(50% - 50px)",
    width: 100
  },
  "loadingIcon": {
    color: theme.palette.primary.light,
    fontSize: "inherit",
    animationName: "spin",
    animationDuration: theme.transitions.duration.standard * 2,
    animationTimingFunction: theme.transitions.easing.sharp,
    animationIterationCount: "infinite",
    animationFillMode: "both"
  },
  "link": {
    ...theme.typography.body2,
    "textAlign": "left",
    "&:hover": {
      color: theme.palette.secondary.main
    }
  }
});
