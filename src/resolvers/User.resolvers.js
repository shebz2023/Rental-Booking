import { userService } from "../services/user.services.js";
export const userResolvers = {
  Query: {
    users: async (_, context) => {
      const payload = await userService.getUsers();
      return payload;
    },
  },
  Mutation: {
    signUp: async (_, args, context) => {
      const { email, name, password, role } = args;
      const payload = await userService.signUp(email, name, password, role);
      return payload;
    },
    login: async (_, args, context) => {
      const { email, password } = args;
      const payload = await userService.login(email, password);
      return payload;
    },
    updateUser: async (_,args , context) =>{
      console.log(args, context)
Consider adding a TODO comment with specific tasks or remove the comment if it does not add value.
    }
  },
};
