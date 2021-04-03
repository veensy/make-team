import { gql } from '@apollo/client';

export const DELETE_TEAM = gql`
  mutation DeleteTeam(
    $id: ID!
  ) {
    deleteTeam(
      id: $id
    ) {
      id
    }
  }
`;
export default DELETE_TEAM;
