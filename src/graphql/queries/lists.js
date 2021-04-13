import { gql } from '@apollo/client';

export const GET_LISTS_MONTH = gql`
  query GetListsMonth(
    $year: String
    $month: String
    $city: String
    $event: String
  ) {
    list(year: $year, month: $month, city: $city, event: $event) {
      id
      year
      month
      day
      title
      link
      city
      event
      eventName
    }
  }
`;
export default GET_LISTS_MONTH;
