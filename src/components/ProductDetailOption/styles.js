export default (theme) => ({
  optionButton: {
    "fontWeight": 600,
    "padding": theme.spacing.unit,
    "borderRadius": "2px",
    "backgroundColor": theme.palette.primary.contrastText,
    "border": "1px solid",
    "minWidth": 150,
    "borderColor": theme.palette.reaction.borderColor,
    "&:hover": {
      borderColor: theme.palette.reaction.activeElementBorderColor
    },
    "&:focus": {
      outline: "auto 5px -webkit-focus-ring-color"
    }
  },
  optionText: {
    fontWeight: 500,
    fontSize: "0.9rem"
  },
  isSelected: {
    borderColor: theme.palette.reaction.activeElementBorderColor
  },
  soldOutOption: {
    opacity: 0.2
  }
});
