import { gql } from '@apollo/client';

export const GET_TEAMS_MONTH = gql`
  query GetTeamsMonth(
    $year: String
    $month: String
    $city: String
    $event: String
  ) {
    team(
      year: $year
      month: $month
      city: $city
      event: $event
    ) {
      id
      year
      month
      day
      md
      keyboard
      bass
      guitar
      drum
      city
      event
      eventName
    }
  }
`;
export default GET_TEAMS_MONTH;
