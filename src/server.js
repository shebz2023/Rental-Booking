import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema.js";
import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./resolvers/User.resolvers.js";
import { propertyResolver } from "./resolvers/Property.resolvers.js";
import { bookingResolver } from "./resolvers/Booking.resolver.js";
import { authorizeUser } from "./middlewares/token.js";
import express from "express";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./utils/passport.js";

const port = process.env.PORT || 8080;
const app = express();
const REDIRECT_URL = process.env.REDIRECT_URL;

const resolvers = mergeResolvers([
  userResolvers,
  propertyResolver,
  bookingResolver,
]);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect to the React app after successful login
    res.redirect(REDIRECT_URL);
  }
);
app.get("/api/current-user", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    // If no user is authenticated, return an error or null
    res.status(401).json({ error: "Not authenticated" });
  }
});
app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: authorizeUser,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath} 🚀`
    );
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
