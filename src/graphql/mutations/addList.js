import { gql } from '@apollo/client';

export const ADD_LIST = gql`
  mutation AddList(
    $year: String!
    $month: String!
    $sunday: String!
    $title: String
    $link: String
  ) {
    addList(
      year: $year
      month: $month
      sunday: $sunday
      title: $title
      link: $link
    ) {
      id
      year
      month
      sunday
      title
      link
    }
  }
`;
export default ADD_LIST;
