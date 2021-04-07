import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String!
    $roleId: ID!
    $isAdminId: ID!
    $isDmId: ID!
  ) {
    updateUser(
      id: $id
      name: $name
      roleId: $roleId
      isAdminId: $isAdminId
      isDmId: $isDmId
    ) {
      id
      name
    }
  }
`;
export default UPDATE_USER;
