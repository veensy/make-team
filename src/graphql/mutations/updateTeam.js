import { gql } from '@apollo/client';

export const UPDATE_TEAM = gql`
  mutation UpdateTeam(
    $id: ID!
    $md: String
    $bass: String
    $guitar: String
    $keyboard: String
    $drum: String
  ) {
    updateTeam(
      id: $id
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
export default UPDATE_TEAM;
