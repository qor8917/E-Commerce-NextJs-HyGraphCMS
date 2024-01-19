import { Cart } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CartFragment } from '../graphql-fragments';
import hygraphClient, { gql } from '../hygraph-cilent';

export const getCartQuery: TypedDocumentNode<
  { cart: Cart },
  Record<string, { id: string }>
> = parse(gql`
  query cart($where: CartWhereUniqueInput!) {
    cart(where: $where) {
      ...CartFragment
    }
  }
  ${CartFragment}
`);
async function getCartById(id: string): Promise<Cart> {
  const where = { id };
  const { cart } = await hygraphClient.request(getCartQuery, {
    where,
  });
  return cart;
}

export default getCartById;
