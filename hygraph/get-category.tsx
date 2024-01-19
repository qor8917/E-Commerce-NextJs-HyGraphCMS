import { Category } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CategoryFragment } from './graphql-fragments';
import hygraphClient, { gql } from './hygraph-cilent';

export const getCategoryQuery: TypedDocumentNode<
  { categories: Category[] },
  Record<string, string>
> = parse(gql`
  query getCategoryQuery($slug: String!) {
    categories(where: { slug: $slug }) {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`);
async function getCategoryBySlug(slug: string): Promise<Category> {
  const {
    categories: [category],
  } = await hygraphClient.request(getCategoryQuery, {
    slug,
  });
  return category;
}

export default getCategoryBySlug;
