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
  "chip": {
    ...theme.typography.caption,
    borderRadius: 4,
    height: "auto",
    fontSize: 12,
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 0.5,
    position: "absolute",
    zIndex: 100
  },
  "chipLabel": {
    fontWeight: theme.typography.fontWeightBold,
    padding: 0
  },
  "status": {
    color: theme.palette.primary.contrastText,
    left: theme.spacing.unit,
    top: theme.spacing.unit
  },
  "statusSoldOut": {
    backgroundColor: theme.palette.secondary.main
  },
  "statusBackorder": {
    backgroundColor: theme.palette.secondary.dark
  },
  "statusSale": {
    backgroundColor: theme.palette.error.main
  },
  "statusBestseller": {
    backgroundColor: theme.palette.primary.light
  },
  "warning": {
    backgroundColor: "transparent",
    right: theme.spacing.unit,
    top: theme.spacing.unit
  },
  "img": {
    width: "100%",
    height: "auto"
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
