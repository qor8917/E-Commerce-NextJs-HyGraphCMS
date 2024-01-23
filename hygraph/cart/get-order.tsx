import { Cart } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CartFragment } from '../graphql-fragments';
import hygraphClient, { gql } from '../hygraph-cilent';

export const getOrderQuery: TypedDocumentNode<
  { carts: Cart[] },
  Record<string, { stripeCheckoutId: string }>
> = parse(gql`
  query carts($where: CartWhereInput!) {
    carts(where: $where) {
      ...CartFragment
    }
  }
  ${CartFragment}
`);
async function getOrderById(id: string): Promise<Cart> {
  const where = { stripeCheckoutId: id };
  const { carts } = await hygraphClient.request(getOrderQuery, {
    where,
  });
  return carts[0];
}

export default getOrderById;
