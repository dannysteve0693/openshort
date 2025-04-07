import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
