import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./resolvers/User.resolvers.js";
import { propertyResolver } from "./resolvers/Property.resolvers.js";
import { bookingResolver } from "./resolvers/Booking.resolver.js";
import { authorizeUser } from "./middlewares/token.js";

const port = process.env.PORT || 8080;
const resolvers = mergeResolvers([
  userResolvers,
  propertyResolver,
  bookingResolver,
]);

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: authorizeUser,
});

server
  .listen({
    port,
    cors: {
      origin: "*",
    },
  })
  .then(({ url }) => {
    console.log(`Server ready at: ${url} 🚀`);
  });
