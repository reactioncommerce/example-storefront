import { ApolloLink } from "@apollo/client";

const omitTypename = (key, value) => ((key === "__typename") ? undefined : value);

export const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward ? forward(operation) : null;
});
