import { gql } from '@apollo/client';

export const GET_DM = gql`
  query GET_DM {
    isDm {
      users {
        name
      }
    }
  }
`;
export default GET_DM
