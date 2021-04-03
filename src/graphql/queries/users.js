import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      role {
        role
      }
      isDm {
        status
      }
      isAdmin {
        status
      }
    }
  }
`;
export default GET_USERS

