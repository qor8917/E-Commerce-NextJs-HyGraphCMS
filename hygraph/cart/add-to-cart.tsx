import { Cart, CartItem } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CartFragment, LinesFragment } from '../graphql-fragments';
import hygraph, { gql } from '../hygraph-mutation-client';

const addToCartMutation: TypedDocumentNode<
  { updateCart: Cart },
  Record<string, any>
> = parse(gql`
  mutation UpdateCart(
    $where: CartWhereUniqueInput!
    $cartLines: CartLineUpdateManyInlineInput!
  ) {
    updateCart(where: $where, data: { cartLines: $cartLines }) {
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
async function addToCart(id: string, lines: any): Promise<CartItem> {
  const where = { id };

  const { updateCart } = await hygraph.request(addToCartMutation, {
    where,
    cartLines: lines,
  });
  const { publishCartLine } = await hygraph.request(publishLineMutation, {
    id: updateCart.cartLines[updateCart.cartLines.length - 1].id,
  });
  return publishCartLine;
}

export default addToCart;
