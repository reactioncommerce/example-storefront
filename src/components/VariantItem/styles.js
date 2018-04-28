export default (theme) => ({
  variantButton: {
    "display": "flex",
    "justifyContent": "space-between",
    "textTransform": "none",
    "width": "100%",
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.contrastText,
    "border": "1px solid",
    "borderColor": theme.palette.reaction.borderColor,
    "padding": theme.spacing.unit * 2,
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
