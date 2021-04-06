import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($name: String!, $roleId: ID, $isAdminId: ID!, $isDmId: ID!) {
    addUser(
      name: $name
      roleId: $roleId
      isAdminId: $isAdminId
      isDmId: $isDmId
    ) {
      id
      name
      role {
        role
      }
      isAdmin {
        status
      }
      isDm {
        status
      }
    }
  }
`;
export default ADD_USER;
