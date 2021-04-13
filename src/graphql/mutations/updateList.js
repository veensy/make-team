import { gql } from '@apollo/client';

export const UPDATE_LIST = gql`
  mutation UpdateList(
    $id: ID!
    $title: String
    $link: String
  ) {
    updateList(
      id: $id
      title: $title
      link: $link
    ) {
      id
      year
      month
      day
      title
      link
    }
  }
`;
export default UPDATE_LIST;
