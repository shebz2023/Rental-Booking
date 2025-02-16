import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

export const ErrorTypes = {
  BAD_USER_INPUT: {
    errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400,
  },
  BAD_REQUEST: {
    errorCode: ApolloServerErrorCode.BAD_REQUEST,
    errorStatus: 400,
  },
  NOT_FOUND: {
    errorCode: "NOT_FOUND",
    errorStatus: 404,
  },
  UNAUTHORIZED: {
    errorCode: ApolloServerErrorCode.UNAUTHORIZED,
    errorStatus: 401,
  },
  UNAUTHENTICATED: {
    errorCode: "UNAUTHENTICATED",
    errorStatus: 401,
  },
  ALREADY_EXISTS: {
    errorCode: "ALREADY_EXISTS",
    errorStatus: 400,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500,
  },
  FORBIDDEN: {
    errorCode: ApolloServerErrorCode.FORBIDDEN,
    errorStatus: 403,
  },
  CONFLICT: {
    errorCode: "CONFLICT",
    errorStatus: 409,
  },
  TIMEOUT: {
    errorCode: "TIMEOUT",
    errorStatus: 504,
  },
};

// throwCustomError function
export const throwCustomError = (errorMessage, errorType) => {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code: errorType.errorCode || "INTERNAL_SERVER_ERROR",
      http: {
        status: errorType.errorStatus,
      },
    },
  });
};
