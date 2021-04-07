import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser(
    $id: ID!
  ) {
    deleteUser(
      id: $id
    ) {
      id
    }
  }
`;
export default DELETE_USER;
