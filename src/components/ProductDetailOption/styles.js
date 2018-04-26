export default (theme) => ({
  variantOptionContainer: {
    display: "flex",
    width: `${theme.spacing.unit * 3.125}%`,
    maxWidth: `${theme.spacing.unit * 3.125}%`,
    padding: theme.spacing.unit * 1.25
  },
  optionButton: {
    "flex": "1 1 auto",
    "fontWeight": 600,
    "padding": theme.spacing.unit * 1.25,
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.contrastText,
    "border": "1px solid",
    "borderColor": theme.palette.primary.borderColor,
    "&:hover": {
      backgroundColor: theme.palette.reaction.activeElementBackground
    }
  },
  optionText: {
    fontWeight: 500,
    fontSize: "14px"
  },
  isSelected: {
    backgroundColor: theme.palette.reaction.activeElementBackground
  }
});
