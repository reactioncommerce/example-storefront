export default `
query primaryShop {
  primaryShop {
    _id
    currency {
      code
    }
    description
    name
  }
}
`;