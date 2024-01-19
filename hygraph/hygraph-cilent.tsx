import { gql, GraphQLClient } from 'graphql-request';

const hygraphClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? '',
  {
    headers: {
      ...(process.env.NEXT_PUBLIC_HYGRAPH_QUERY_TOKEN && {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_QUERY_TOKEN}`,
      }),
    },
  }
);
export default hygraphClient;
export { gql };
