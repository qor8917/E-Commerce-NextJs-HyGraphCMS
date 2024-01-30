import { Customer } from '@/types/types';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import hygraphClient, { gql } from '../hygraph-cilent';

export const getCustomerQuery: TypedDocumentNode<
  { customers: Customer[] },
  string
> = parse(gql`
  query GetCustomerByEmail($where: CustomerWhereInput!) {
    customers(where: $where) {
      id
      password
      email
    }
  }
`);

async function getCustomerByEmail(email: string): Promise<Customer> {
  const where = { email };

  const { customers } = await hygraphClient.request(getCustomerQuery, {
    where,
  });

  return customers[0];
}

export default getCustomerByEmail;
