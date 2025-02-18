import { ErrorTypes, throwCustomError, prisma } from "../utils/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/token.js";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
export const userService = {
  getUsers: async () => {
    try {
      return await prisma.task.findMany();
    } catch (error) {
      throw new Error(`Failed to get tasks: ${error.message}`);
    }
  },
  signUp: async (email, name, password, role) => {
    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throwCustomError(
          "User with this email already exists",
          ErrorTypes.ALREADY_EXISTS
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user in the database
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: role,
        },
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  },
  login: async (email, password) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throwCustomError(
          "Invalid email or password",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throwCustomError(
          "Invalid email or password",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      return {
        accessToken: token,
        refreshToken,
        user,
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
};
