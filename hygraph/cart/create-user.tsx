import { Customer } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import hygraph, { gql } from '../hygraph-mutation-client';

const CreateCustomerByEmail: TypedDocumentNode<
  { createCustomer: Customer },
  Record<string, any>
> = parse(gql`
  mutation CreateCustomerByEmail($data: CustomerCreateInput!) {
    createCustomer(data: $data) {
      email
      id
    }
  }
`);

const publishCustomerMutation: TypedDocumentNode<
  { publishCustomer: Customer },
  Record<string, any>
> = parse(gql`
  mutation publishCustomer($id: ID!) {
    publishCustomer(where: { id: $id }, to: PUBLISHED) {
      email
      id
    }
  }
`);

async function createCustomer(variables?: any): Promise<Customer> {
  const { createCustomer } = await hygraph.request(
    CreateCustomerByEmail,
    variables
  );

  const { publishCustomer } = await hygraph.request(publishCustomerMutation, {
    id: createCustomer.id,
  });

  return publishCustomer;
}

export default createCustomer;
