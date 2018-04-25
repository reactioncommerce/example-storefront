export default (theme) => ({
  variantButton: {
    "display": "flex",
    "justifyContent": "space-between",
    "textTransform": "none",
    "width": "100%",
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.contrastText,
    "border": "1px solid",
    "borderColor": theme.palette.primary.contrastText,
    "paddingTop": theme.spacing.unit * 1.25,
    "paddingBottom": theme.spacing.unit * 1.25,
    "paddingLeft": theme.spacing.unit * 2.5,
    "paddingRight": theme.spacing.unit * 2.5,
    "&:hover": {
      border: "1px solid",
      borderColor: theme.palette.reaction.activeElementBorderColor,
      backgroundColor: theme.palette.primary.contrastText
    }
  },
  activeVariant: {
    border: "1px solid",
    borderColor: theme.palette.reaction.activeElementBorderColor
  }
});
