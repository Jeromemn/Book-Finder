import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      email
      password
      username
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;


