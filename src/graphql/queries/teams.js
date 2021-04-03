import { gql } from '@apollo/client';

export const GET_TEAMS_MONTH = gql`
  query GetTeamsMonth($year: String, $month: String) {
    team(year: $year, month: $month) {
      id
      year
      month
      sunday
      md
      keyboard
      bass
      guitar
      drum
    }
  }
`;
export default GET_TEAMS_MONTH;
