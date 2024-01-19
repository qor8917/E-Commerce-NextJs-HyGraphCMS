import { Cart } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CartFragment } from '../graphql-fragments';
import hygraph, { gql } from '../hygraph-mutation-client';

const createCartMutation: TypedDocumentNode<
  { createCart: Cart },
  Record<string, any>
> = parse(gql`
  mutation CreateCart($data: CartCreateInput!) {
    createCart(data: $data) {
      ...CartFragment
    }
  }
  ${CartFragment}
`);

const publishCartMutation: TypedDocumentNode<
  { publishCart: Cart },
  Record<string, any>
> = parse(gql`
  mutation publishCart($id: ID!) {
    publishCart(where: { id: $id }, to: PUBLISHED) {
      ...CartFragment
    }
  }
  ${CartFragment}
`);

async function createCart(): Promise<Cart> {
  const { createCart } = await hygraph.request(createCartMutation, {
    data: {
      checkoutUrl: null,
      totalQuantity: 0,
      cartLines: {},
      cost: {},
    },
  });

  const { publishCart } = await hygraph.request(publishCartMutation, {
    id: createCart.id,
  });

  return publishCart;
}

export default createCart;
