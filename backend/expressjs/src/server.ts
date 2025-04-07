import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';

import { schema } from './schema';
import { context } from './context';

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    // @ts-ignore to silence deep typing conflict
    // Optional: add CORS, body-parser if needed
    expressMiddleware(server, {
      context: async ({ req }) => context,
    })
  );
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
