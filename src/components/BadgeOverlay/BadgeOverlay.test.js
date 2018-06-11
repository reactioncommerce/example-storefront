import React from "react";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "lib/theme/reactionTheme";
import product from "components/ProductDetail/__mocks__/productData.mock";
import BadgeOverlay from "./BadgeOverlay";

const soldOutProduct = Object.assign({}, product, { isSoldOut: true });
const soldOutProductWithBackorder = Object.assign({}, product, { isBackorder: true, isSoldOut: true });
const saleProduct = Object.assign({}, product, { isOnSale: true });
const saleProductWithLowInventory = Object.assign({}, product, { isOnSale: true, isLowQuantity: true });
const saleProductAndBestseller = Object.assign({}, product, { isOnSale: true, isBestseller: true });
const bestsellerProductWithLowInventory = Object.assign({}, product, { isOnSale: true, isLowQuantity: true });
const lowInventory = Object.assign({}, product, { isLowQuantity: true });

test("Product with no badges", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={product}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with sold out badge", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={soldOutProduct}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with backorder badge", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={soldOutProductWithBackorder}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with sale badge", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={saleProduct}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with sale and low inventory badges", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={saleProductWithLowInventory}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with sale and bestseller badges", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={saleProductAndBestseller}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with bestseller and low inventory badges", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={bestsellerProductWithLowInventory}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Product with low inventory badge", () => {
  const component = renderer.create((
    <MuiThemeProvider theme={theme}>
      <BadgeOverlay product={lowInventory}/>
    </MuiThemeProvider>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
