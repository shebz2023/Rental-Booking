import { ErrorTypes, throwCustomError } from '../utils/index.js'

export const authorizedRole = (allowedRoles) => {
  return (resolver) => {
    return async (parent, args, context, info) => {
      const { user } = context

      if (!user) {
        throwCustomError(
          'Unauthorized: No user information found',
          ErrorTypes.BAD_REQUEST
        )
      }

      if (!allowedRoles.includes(user.role)) {
        throwCustomError(
          'Forbidden: Insufficient role to access this endpoint',
          ErrorTypes.UNAUTHORIZED
        )
      }

      // Proceed to the actual resolver
      return resolver(parent, args, context, info)
    }
  }
}
