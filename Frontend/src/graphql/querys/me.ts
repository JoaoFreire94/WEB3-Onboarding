import { gql } from '@apollo/client';

export const ME = gql`
  query me($token: String!) {
    me(token: $token)
  }
`;
