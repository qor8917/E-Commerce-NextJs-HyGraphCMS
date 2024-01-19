import { CartItem } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { LinesFragment } from '../graphql-fragments';
import hygraph, { gql } from '../hygraph-mutation-client';

export const editCartItemsMutation: TypedDocumentNode<
  { updateCartLine: CartItem },
  Record<string, any>
> = parse(gql`
  mutation editCartItems($id: ID!, $data: CartLineUpdateInput!) {
    updateCartLine(where: $id, data: $data) {
      ...LinesFragment
    }
  }
  ${LinesFragment}
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
async function updateCartLine(lineId: string, lines: any): Promise<CartItem> {
  const { updateCartLine } = await hygraph.request(editCartItemsMutation, {
    lineId,
    lines,
  });
  const { publishCartLine } = await hygraph.request(publishLineMutation, {
    id: updateCartLine.id,
  });
  return publishCartLine;
}

export default updateCartLine;
