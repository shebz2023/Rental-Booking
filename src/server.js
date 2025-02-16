import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./schema";

const port = process.env.PORT || 8080;

new ApolloServer({ resolvers, typeDefs }).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}`)
);
