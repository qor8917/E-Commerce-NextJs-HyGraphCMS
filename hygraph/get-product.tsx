import { Product } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { ProductFragment } from './graphql-fragments';
import hygraphClient, { gql } from './hygraph-cilent';

export const getProductQuery: TypedDocumentNode<
  { products: Product[] },
  Record<string, string>
> = parse(gql`
  query getProductQuery($slug: String!) {
    products(where: { slug: $slug }) {
      ...ProductFragment
    }
  }

  ${ProductFragment}
`);
async function getProductBySlug(slug: string): Promise<Product> {
  const {
    products: [product],
  } = await hygraphClient.request(getProductQuery, {
    slug,
  });
  return product;
}

export default getProductBySlug;
