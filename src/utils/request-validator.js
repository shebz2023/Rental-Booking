import { throwCustomError, ErrorTypes } from "./customError.js";

export const validateUserAccess = (context) => {
  if (!context.user) {
    throwCustomError("unauthorised", ErrorTypes.UNAUTHORIZED);
  }
  return true;
};
