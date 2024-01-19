import { CartItem } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import hygraph, { gql } from '../hygraph-mutation-client';

export const removeFromCartMutation: TypedDocumentNode<
  { deleteCartLine: CartItem },
  Record<string, any>
> = parse(gql`
  mutation removeFromCart($id: ID!) {
    deleteCartLine(where: { id: $id }) {
      id
    }
  }
`);
async function removeFromCart(id: string): Promise<CartItem> {
  const { deleteCartLine } = await hygraph.request(removeFromCartMutation, {
    id,
  });
  return deleteCartLine;
}

export default removeFromCart;
