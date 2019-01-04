import primaryShopIdQuery from "containers/common-gql/primaryShopId.gql";
import navigationQuery from "containers/navigation/navigation.gql";
import navigationTreeIdQuery from "containers/navigation/navigationTreeId.gql";

/**
 * @summary Gets default navigation tree for the current shop from GraphQL
 * @param {Object} client ApolloClient instance
 * @returns {Object[]} Default navigation tree
 */
export default async function getNavigationTree(client) {
  // Get primaryShopId
  const { data: { primaryShopId } } = await client.query({ query: primaryShopIdQuery });

  if (!primaryShopId) {
    throw new Error("primaryShopId query result was null");
  }

  // Get defaultNavigationTreeId
  const { data: { primaryShop: { defaultNavigationTreeId } } } = await client.query({ query: navigationTreeIdQuery });

  if (!defaultNavigationTreeId) {
    throw new Error("navigationTreeIdQuery query result was null");
  }

  // Get defaultNavigationTree
  const navigationTreeByIdVariables = { id: defaultNavigationTreeId };
  const { data: { navigationTreeById } } = await client.query({ query: navigationQuery, navigationTreeByIdVariables });

  if (!navigationTreeById) {
    throw new Error("navigationTreeById query result was null");
  }

  return navigationTreeById;
}
