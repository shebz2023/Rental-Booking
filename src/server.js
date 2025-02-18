import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { userResolvers } from "./resolvers/User.resolvers.js";
import { propertyResolver } from "./resolvers/Property.resolvers.js";
import { authorizeUser } from "./middlewares/token.js";

const port = process.env.PORT || 8080;
const resolvers = mergeResolvers([userResolvers, propertyResolver]);

new ApolloServer({ resolvers, typeDefs, context: authorizeUser }).listen(
  { port },
  () => console.log(`Server ready at: http://localhost:${port}🚀`)
);
