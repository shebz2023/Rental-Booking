import { ErrorTypes, prisma, throwCustomError } from "../utils/index.js";
import JWT from "jsonwebtoken";
import { GraphQLError } from "graphql";
import env from "dotenv";

env.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateAccessToken = (data) => {
  return JWT.sign(data, JWT_SECRET, { expiresIn: "1d" });
};

export const generateRefreshToken = (data) => {
  return JWT.sign(data, JWT_SECRET, { expiresIn: "7d" });
};

export const authorizeUser = async ({ req, res }) => {
  if (
    req.body.operationName === "IntrospectionQuery" ||
    req.body.operationType === "queries"
  ) {
    return null;
  }

  if (
    req.body.operationName === "SignUp" ||
    req.body.operationName === "Login"
  ) {
    return null;
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    throwCustomError("Authentication token is missing", ErrorTypes.BAD_REQUEST);
  }

  try {
    // Verify token
    const decodedToken = verifyToken(token);
    // Find user based on the decoded token
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      throwCustomError("User not found", ErrorTypes.NOT_FOUND);
    }
    // Attach the user to the request
    return { user };
  } catch (error) {
    if (error instanceof GraphQLError) {
      throw error;
    }

    throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
  }
};

export const verifyToken = (token) => {
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (err) {
    throw err;
  }
};
