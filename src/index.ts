import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

import casual from 'casual'
import { importSchema } from 'graphql-import'

const typeDefs = importSchema('schema/schema.graphql');
const PORT = 4000;
const mocks = {
  Int: () => 6,
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
  }),
});

// server.listen({ port: PORT }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
