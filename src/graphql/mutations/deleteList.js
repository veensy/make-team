import { gql } from '@apollo/client';

export const DELETE_LIST = gql`
  mutation DeleteList(
    $id: ID!
  ) {
    deleteList(
      id: $id
    ) {
      id
    }
  }
`;
export default DELETE_LIST;
