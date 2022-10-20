import { gql } from '@apollo/client';

export const LOGIN = gql`
  query login($ethSignature: String!) {
    login(ethSignature: $ethSignature)
  }
`;
