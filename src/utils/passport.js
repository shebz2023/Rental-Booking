import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import { prisma } from "../utils/index.js"; // Ensure prisma is imported

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in the database using Prisma
          const user = await prisma.user.findUnique({
            where: { googleId: profile.id },
          });

          if (!user) {
            // If the user doesn't exist, create a new user using Prisma
            await prisma.user.create({
              data: {
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
              },
            });
          }

          // Pass the user object to the next step
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const _user = await prisma.user.findUnique({
        where: { id: id },
      });
      done(null, _user);
    } catch (err) {
      done(err, null);
    }
  });
};
