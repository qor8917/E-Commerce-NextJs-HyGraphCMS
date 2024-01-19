import { gql, GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? '',
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_MUTATION_TOKEN}`,
    },
  }
);

export default hygraph;
export { gql };
