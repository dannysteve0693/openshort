import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
    urls: [Url!]!
  }

  type Url {
    id: ID!
    shortCode: String!
    originalUrl: String!
    clicks: Int!
    expiresAt: String
    isActive: Boolean!
    creator: User!
    analytics: [Click!]!
  }

  type Click {
    id: ID!
    countryCode: String
    deviceType: String
    clickedAt: String!
  }

  type Query {
    getUserUrls: [Url!]!
    getUrlAnalytics(shortCode: String!): Url
  }

  type Mutation {
    register(email: String!, password: String): AuthPayload!
    login(email: String!, password: String): AuthPayload!
    googleLogin(token: String!): AuthPayload!
    createUrl(originalUrl: String!, customCode: String): Url!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
export default typeDefs;