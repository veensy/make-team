import { gql } from '@apollo/client';

export const UPDATE_TEAM = gql`
  mutation UpdateTeam(
    $id: ID!
    $year: String!
    $month: String!
    $day: String!
    $md: String
    $bass: String
    $guitar: String
    $keyboard: String
    $drum: String
    $city: String!
    $event: String!
    $eventName: String
  ) {
    updateTeam(
      id: $id
      year: $year
      month: $month
      day: $day
      md: $md
      bass: $bass
      guitar: $guitar
      keyboard: $keyboard
      drum: $drum
      city: $city
      event: $event
      eventName: $eventName
    ) {
      id
      year
      month
      day
      md
      bass
      keyboard
      guitar
      drum
      city
      event
      eventName
    }
  }
`;
export default UPDATE_TEAM;
