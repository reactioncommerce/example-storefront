import "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    reaction: any;
  }
  interface PaletteOptions {
    reaction?: any;
  }
}
