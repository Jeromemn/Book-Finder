const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }
  #  book id needs to be the books id value from google book api
  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  #  look into for saveBook
  # input SavedBookInput {
  #      authors: [String]
  #     description: String
  #     bookId: String
  #     image: String
  #     link: String
  #     title: String
  # }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      authors: [String]
      description: String
      bookId: String
      image: String
      link: String
      title: String
    ): User
    removeBook(bookId: String): User
    # removeUser()
  }
`;

module.exports = typeDefs;
