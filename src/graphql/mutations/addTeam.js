import { gql } from '@apollo/client';

export const ADD_TEAM = gql`
  mutation AddTeam(
    $year: String!
    $month: String!
    $sunday: String!
    $md: String
    $bass: String
    $guitar: String
    $keyboard: String
    $drum: String
  ) {
    addTeam(
      year: $year
      month: $month
      sunday: $sunday
      md: $md
      bass: $bass
      guitar: $guitar
      keyboard: $keyboard
      drum: $drum
    ) {
      id
      year
      month
      sunday
      md
      bass
      keyboard
      guitar
      drum
    }
  }
`;
export default ADD_TEAM;
