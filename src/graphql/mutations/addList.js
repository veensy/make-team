import { gql } from '@apollo/client';

export const ADD_LIST = gql`
  mutation AddList(
    $year: String!
    $month: String!
    $day: String!
    $title: String
    $link: String
    $city:String!
    $event:String!
    $eventName:String
  ) {
    addList(
      year: $year
      month: $month
      day: $day
      title: $title
      link: $link
      city:$city
      event:$event
      eventName:$eventName
    ) {
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
export default ADD_LIST;
