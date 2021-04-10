import { gql } from '@apollo/client';

export const GET_LISTS_MONTH = gql`
  query GetListsMonth($year: String, $month: String) {
    list(year: $year, month: $month) {
      id
      year
      month
      sunday
      title
      link
    }
  }
`;
export default GET_LISTS_MONTH;
