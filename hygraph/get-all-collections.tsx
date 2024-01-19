import { Collection } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { CollectionFragment } from './graphql-fragments';
import hygraphClient, { gql } from './hygraph-cilent';

export const getAllCollectionsQuery: TypedDocumentNode<
  { collections: Collection[] },
  Record<any, never>
> = parse(gql`
  query AllCollectionsQuery {
    collections {
      ...CollectionFragment
    }
  }
  ${CollectionFragment}
`);
async function getAllCollections(): Promise<Collection[]> {
  const { collections } = await hygraphClient.request(getAllCollectionsQuery);

  return collections;
}

export default getAllCollections;
