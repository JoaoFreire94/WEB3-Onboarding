import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $ethSignature: String!) {
    createUser(ethSignature: $ethSignature, email: $email, name: $name)
  }
`;
