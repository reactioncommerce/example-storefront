import { createMuiTheme } from "@material-ui/core/styles";

const baseTheme = createMuiTheme({
  layout: {
    mainContentMaxWidth: "1440px",
    mainLoginMaxWidth: "1024px"
  },
  title: {
    color: "#1999DD",
  },
  palette: {
    primary: {
      light: "#26B0F9",
      main: "#1999DD",
      dark: "#172F3C",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#5d8ea9",
      main: "#5E7480",
      dark: "#1D1D1D",
      contrastText: "#000000"
    },
    background: {
      default: "#ffffff"
    },
    error: {
      light: "#E54F5D",
      main: "#CD3F4C",
      dark: "#3C1F21",
      contrastText: "#FFFFFF"
    },
    action: {
      hover: "#f5f5f5",
      selected: "#f5f5f5"
    },
    colors: {
      buttonBorderColor: "#5e7480"
    },
    borders: {
      default: "1px solid #e6e6e6"
    },
    reaction: {
      activeElementBorderColor: "#94E8D1",
      activeElementBackground: "#E6E6E6",
      badges: {
        bestseller: "#8CE0C9",
        sale: "#E54F5D"
      },
      borderColor: "#CCCCCC",
      buttonBorderRadius: 2,
      // grey scale
      black: "#000000",
      black95: "#0d0d0d",
      black90: "#1a1a1a",
      black85: "#262626",
      black80: "#333333",
      black75: "#404040",
      black70: "#4d4d4d",
      black65: "#595959",
      black60: "#666666",
      black55: "#737373",
      black50: "#808080",
      black45: "#8c8c8c",
      black40: "#999999",
      black35: "#a6a6a6",
      black30: "#b3b3b3",
      black25: "#bfbfbf",
      black20: "#cccccc",
      black15: "#d9d9d9",
      black10: "#e6e6e6",
      black05: "#f5f5f5",
      black02: "#fafafa",
      white: "#ffffff",
      // medium colors
      reactionBlue: "#1999dd",
      reactionBlue100: "#ecf8fe",
      reactionBlue200: "#d6e5ed",
      reactionBlue300: "#26b0f9",
      reactionBlue400: "#067ebe",
      reactionBlue500: "#285268",
      reactionBlue600: "#172f3c",
      coolGrey: "#5e7480",
      coolGrey100: "#e3ebf0",
      coolGrey200: "#d5d5d5",
      coolGrey300: "#5d8ea9",
      coolGrey400: "#3c5d6f",
      coolGrey500: "#3c3c3c",
      coolGrey600: "#1d1d1d",
      // dark colors
      forestGreen: "#158562",
      forestGreen100: "#dcfaf1",
      forestGreen200: "#b4ddc1",
      forestGreen300: "#0db781",
      forestGreen400: "#066144",
      forestGreen500: "#285749",
      forestGreen600: "#1e4035",
      darkBlue: "#23566d",
      darkBlue100: "#d9ebf3",
      darkBlue200: "#c4d3da",
      darkBlue300: "#135471",
      darkBlue400: "#103a4d",
      darkBlue500: "#333f45",
      darkBlue600: "#242c30",
      // support colors
      yellow: "#3fc95f",
      yellow100: "#fcf3dc",
      yellow200: "#e9e1cb",
      yellow300: "#fdda79",
      yellow400: "#fbc120",
      yellow500: "#a2832d",
      yellow600: "#7a6322",
      red: "#cd3f4c",
      red100: "#ffeeef",
      red200: "#f0e8e9",
      red300: "#e54f5d",
      red400: "#bc1d2b",
      red500: "#5e3033",
      red600: "#3c1f21",
      teal: "#8ce0c9",
      teal100: "#edfdf8",
      teal200: "#d9ece6",
      teal300: "#a3f2dc",
      teal400: "#55e4be",
      teal500: "#447467",
      teal600: "#34584f"
    }
  },
  borderRadii: {
    default: 2
  },
  boxShadow: {
    depth0: "none",
    depth1: "0 0 1rem -0.5rem #808080",
    depth2: "0 0 1rem #808080"
  },
  spacing: {
    unithalf: 4,
    unit: 8
  },
  typography: {
    fontFamily: "Source Sans Pro, Helvetica Neue, Helvetica, sans-serif",
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700
  }
});


const reactionTheme = {
  Header: {
    appBar: {
      backgroundColor: baseTheme.palette.reaction.white,
      borderBottom: `solid 1px ${baseTheme.palette.reaction.black05}`,
      color: baseTheme.palette.reaction.coolGrey500
    },
    controls: {
      alignItems: "inherit",
      display: "inherit",
      flex: 1
    },
    title: {
      color: baseTheme.palette.reaction.black,
      marginRight: baseTheme.spacing.unit,
      borderBottom: `solid 5px ${baseTheme.palette.reaction.reactionBlue200}`
    },
    toolbar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between"
    }
  },
  AccountDropdown: {
    accountDropdown: {
      width: 320,
      padding: baseTheme.spacing.unit * 2
    }
  },
  Breadcrumbs: {
    container: {
      display: "flex",
      alignItems: "center",
      maxWidth: baseTheme.layout.mainContentMaxWidth,
      marginLeft: "auto",
      marginRight: "auto"
    },
    breadcrumbLink: {
      fontSize: "14px",
      fontFamily: baseTheme.typography.fontFamily,
      color: "#3c3c3c",
      border: 0,
      textDecoration: "underline",
      margin: "0 7px"
    },
    breadcrumbIcon: {
      fontSize: "14px"
    }
  },
  Cart: {
    cart: {
      width: "90vw"
    }
  },
  CartItems: {
    loadMore: {
      display: "flex",
      justifyContent: "center",
      marginTop: baseTheme.spacing.unit * 2,
      marginBottom: baseTheme.spacing.unit * 2
    }
  },
  CartPopover: {
    container: {
      "alignItems": "center",
      "backgroundColor": baseTheme.palette.reaction.white,
      "boxShadow": baseTheme.boxShadow.depth2,
      "display": "flex",
      "marginLeft": "auto",
      "marginRight": "auto",
      "maxWidth": "400px",
      "paddingTop": "12px",
      "position": "fixed",
      "right": 0,
      "top": 0,
      "transitionDuration": "400ms",
      "transitionProperty": "transform",
      "transitionTimingFunction": "linear",
      "zIndex": baseTheme.zIndex.appBar + 1,
      "&:hover": {
        transform: "translate(0px, 0px)"
      }
    },
    gridContainer: {
      padding: "10px"
    },
    isContainerHidden: {
      transform: "translate(400px, 0px)"
    },
    isContainerVisible: {
      transform: "translate(0px, 0px)"
    },
    containerItem: {
      alignItems: "center",
      display: "flex"
    },
    addedToCartImg: {
      height: "40px",
      marginRight: "10px",
      width: "40px"
    },
    addedToCartItemName: {
      maxWidth: "200px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontWeight: baseTheme.typography.fontWeightMedium,
      display: "inline-block",
      lineHeight: "0.8em"
    },
    addedToCartText: {
      color: baseTheme.palette.primary.dark,
      display: "inline",
      fontSize: baseTheme.typography.fontSize * 0.875
    }
  },
  Divider: {
    container: {
      display: "flex",
      alignItems: "center"
    },
    label: {
      flex: 0,
      flexBasis: "auto",
      textTransform: "uppercase",
      fontWeight: baseTheme.typography.fontWeightBold,
      fontSize: "0.7rem",
      paddingRight: baseTheme.spacing.unit,
      paddingLeft: baseTheme.spacing.unit,
      letterSpacing: "0.1rem"
    },
    item: {
      flex: "1 1 auto",
      border: 0,
      borderTop: "1px solid",
      borderColor: baseTheme.palette.reaction.borderColor,
      marginTop: baseTheme.spacing.unit * 2,
      marginBottom: baseTheme.spacing.unit * 2
    }
  },
  Footer: {
    footer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginBottom: baseTheme.spacing.unit * 2
    }
  },
  Img: {
    imgWrapper: {
      backgroundColor: baseTheme.palette.common.white, // palette.grey["100"],
      display: "block",
      height: 0,
      overflow: "hidden",
      paddingTop: "100%",
      position: "relative",
      width: "100%"
    },
    imgHeroWrapper: {
      paddingTop: "30%"
    },
    img: {
      height: "auto",
      left: "50%",
      opacity: 1,
      position: "absolute",
      transition: `opacity ${baseTheme.transitions.duration.standard}ms ${baseTheme.transitions.easing.easeInOut}`,
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%"
    },
    imgLoaded: {
      zIndex: baseTheme.zIndex.mobileStepper
    },
    imgLoading: {
      filter: "blur(8px)",
      zIndex: baseTheme.zIndex.appBar
    },
    imgHidden: {
      opacity: 0
    }
  },
  Layout: {
    root: {
      minHeight: "100vh"
    },
    main: {
      flex: "1 1 auto",
      maxWidth: baseTheme.layout.mainContentMaxWidth,
      marginLeft: "auto",
      marginRight: "auto"
    },
    article: {
      padding: baseTheme.spacing.unit * 3
    }
  },
  MediaGallery: {
    root: {
      width: "100%"
    },
    featured: {
      display: "flex",
      justifyContent: "center",
      marginBottom: baseTheme.spacing.unit
    },
    featuredImage: {
      flex: 0,
      height: "100%"
    }
  },
  MediaGalleryItem: {
    root: {
      width: "100%"
    }
  },
  MiniCart: {
    popper: {
      marginTop: "0.5rem",
      marginRight: "1rem",
      zIndex: baseTheme.zIndex.modal
    },
    cart: {
      backgroundColor: baseTheme.palette.common.white
    },
    emptyCart: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 320,
      height: 320,
      border: baseTheme.palette.borders.default
    }
  },
  NavigationItemDesktop: {
    popover: {
      maxWidth: "100vw",
      padding: baseTheme.spacing.unit * 2,
      width: "100vw"
    },
    grid: {
      width: "100vw"
    },
    navigationShopAllLink: {
      display: "flex",
      textDecoration: "underline",
      fontSize: "14px",
      marginTop: baseTheme.spacing.unit * 6,
      marginBottom: baseTheme.spacing.unit * 2,
      fontFamily: baseTheme.typography.fontFamily
    },
    navigationShopAllLinkIcon: {
      fontSize: "12px"
    },
    primaryNavItem: {
      textTransform: "capitalize"
    }
  },
  NavigationItemMobile: {
    subNav: {
      marginBottom: baseTheme.spacing.unit * 2
    },
    listItemTextInset: {
      "&:first-child": {
        paddingLeft: baseTheme.spacing.unit * 3
      }
    }
  },
  NavigationMobile: {
    nav: {
      width: 320
    }
  },
  PageStepper: {
    root: {
      paddingTop: baseTheme.spacing.unit * 2,
      paddingBottom: baseTheme.spacing.unit * 2
    }
  },
  ProductDetail: {
    section: {
      marginBottom: baseTheme.spacing.unit * 2
    },
    breadcrumbGrid: {
      marginBottom: baseTheme.spacing.unit * 2,
      marginTop: baseTheme.spacing.unit * 2
    }
  },
  ProductDetailAddToCart: {
    addToCartButton: {
      "padding": baseTheme.spacing.unit,
      "backgroundColor": baseTheme.palette.primary.light,
      "borderRadius": baseTheme.palette.reaction.buttonBorderRadius,
      "minWidth": "66%",
      "&:hover": {
        borderColor: baseTheme.palette.reaction.activeElementBorderColor
      },
      "&:focus": {
        outline: "auto 5px -webkit-focus-ring-color"
      }
    },
    addToCartText: {
      color: baseTheme.palette.primary.contrastText,
      fontWeight: 600
    },
    incrementButton: {
      backgroundColor: baseTheme.palette.reaction.black02,
      color: baseTheme.palette.reaction.coolGray500,
      fontSize: "12px",
      padding: 6
    },
    quantityContainer: {
      padding: 0,
      border: `1px solid ${baseTheme.palette.reaction.black15}`,
      backgroundColor: baseTheme.palette.common.white,
      borderRadius: baseTheme.palette.reaction.buttonBorderRadius
    },
    quantityGrid: {
      marginBottom: baseTheme.spacing.unit * 3
    },
    quantityInput: {
      "color": baseTheme.palette.reaction.coolGray500,
      "fontSize": "12px",
      "width": "40px",
      "textAlign": "center",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      },
      "borderLeft": `1px solid ${baseTheme.palette.reaction.black15}`,
      "borderRight": `1px solid ${baseTheme.palette.reaction.black15}`
    },
    quantityTypography: {
      color: baseTheme.palette.reaction.coolGray500,
      marginBottom: baseTheme.spacing.unit * 2
    }
  },
  ProductDetailOption: {
    optionButton: {
      "fontWeight": 600,
      "padding": baseTheme.spacing.unit,
      "borderRadius": "2px",
      "backgroundColor": baseTheme.palette.primary.contrastText,
      "border": "1px solid",
      "minWidth": 150,
      "borderColor": baseTheme.palette.reaction.borderColor,
      "&:hover": {
        borderColor: baseTheme.palette.reaction.activeElementBorderColor
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
      borderColor: baseTheme.palette.reaction.activeElementBorderColor
    }
  },
  ProductDetailOptionsList: {
    root: {
      position: "relative",
      marginTop: baseTheme.spacing.unit,
      marginBottom: baseTheme.spacing.unit
    },
    alert: {
      display: "flex",
      top: -baseTheme.spacing.unit * 2,
      right: baseTheme.spacing.unit * 1
    },
    badge: {
      fontSize: "0.5rem",
      top: -baseTheme.spacing.unit,
      left: baseTheme.spacing.unit * 11
    }
  },
  ProductGrid: {
    filters: {
      justifyContent: "flex-end",
      marginBottom: baseTheme.spacing.unit * 2
    }
  },
  ProductGridEmptyMessage: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "4rem"
    },
    actionMessage: {
      color: baseTheme.palette.reaction.coolGrey400
    },
    notFoundMessage: {
      color: baseTheme.palette.reaction.black65
    }
  },
  ProductGridHero: {
    heroImg: {
      width: "100%",
      height: "325px",
      objectFit: "cover"
    },
    heroGridContainer: {
      maxWidth: baseTheme.layout.mainContentMaxWidth,
      margin: "40px auto"
    }
  },
  Select: {
    popOver: {
      border: baseTheme.palette.borders.default,
      boxShadow: "none"
    },
    menuItem: {
      fontSize: "1rem",
      paddingTop: baseTheme.spacing.unit,
      paddingBottom: baseTheme.spacing.unit
    },
    selectMenu: {
      fontSize: "1rem",
      border: baseTheme.palette.borders.default,
      paddingLeft: baseTheme.spacing.unit,
      borderRadius: baseTheme.borderRadii.default
    },
    selected: {
      backgroundColor: baseTheme.palette.action.hover
    },
    input: {
      width: baseTheme.spacing.unit * 21
    }
  },
  TagGrid: {
    title: {
      marginBottom: baseTheme.spacing.unit
    },
    chip: {
      cursor: "pointer"
    }
  },
  VariantItem: {
    variantButton: {
      "display": "flex",
      "justifyContent": "space-between",
      "textTransform": "none",
      "width": "100%",
      "borderRadius": "2px",
      "backgroundColor": baseTheme.palette.primary.contrastText,
      "border": "1px solid",
      "borderColor": baseTheme.palette.reaction.borderColor,
      "padding": baseTheme.spacing.unit * 2,
      "&:hover": {
        border: "1px solid",
        borderColor: baseTheme.palette.reaction.activeElementBorderColor,
        backgroundColor: baseTheme.palette.primary.contrastText
      },
      "&:focus": {
        outline: "auto 5px -webkit-focus-ring-color"
      }
    },
    activeVariant: {
      border: "1px solid",
      borderColor: baseTheme.palette.reaction.activeElementBorderColor
    }
  },
  VariantList: {
    variantsContainer: {
    },
    variantItem: {
      position: "relative",
      marginTop: baseTheme.spacing.unit * 1.25,
      marginBottom: baseTheme.spacing.unit * 1.25
    },
    alert: {
      display: "flex",
      position: "absolute",
      top: -baseTheme.spacing.unit * 2,
      right: baseTheme.spacing.unit * 11
    }
  }
}

const theme = createMuiTheme({
  ...baseTheme,
  ...reactionTheme
});

export default theme;
