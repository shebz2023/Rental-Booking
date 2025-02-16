
export const resolvers = {
  Query: {
    users: async (_, context) => {
      const payload = await UserService.getUsers();
      return payload;
    },
  },
  Mutation: {
    signUp: async (_, args, context) => {
      const { email, password, role } = args;
      const payload = await UserService.createUser(email, password, role);
      return payload;
    },
    login: async (_, args, context) => {
      const { email, password } = args;
      const payload = await UserService.login(email, password);
      return payload;
    },
  },
};
