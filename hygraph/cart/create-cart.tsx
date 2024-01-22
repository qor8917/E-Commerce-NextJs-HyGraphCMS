import { Cart, CartItem } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CartFragment, LinesFragment } from '../graphql-fragments';
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
const publishLineMutation: TypedDocumentNode<
  { publishCartLine: CartItem },
  Record<string, any>
> = parse(gql`
  mutation PublishCartLine($id: ID!) {
    publishCartLine(where: { id: $id }, to: PUBLISHED) {
      ...LinesFragment
    }
  }
  ${LinesFragment}
`);
async function createCart(variables?: any): Promise<Cart> {
  const { createCart } = await hygraph.request(createCartMutation, variables);
  createCart.cartLines.forEach(async (line, index) => {
    await hygraph.request(publishLineMutation, {
      id: createCart.cartLines[index].id,
    });
  });

  const { publishCart } = await hygraph.request(publishCartMutation, {
    id: createCart.id,
  });

  return publishCart;
}

export default createCart;
