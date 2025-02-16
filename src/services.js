import { Prisma } from "@prisma/client";

export const UserServices = {
  getUsers: async () => {
    try {
      return await prisma.task.findMany();
    } catch (error) {
      throw new Error(`Failed to get tasks: ${error.message}`);
    }
  },
  signUp: async (email, password, role) => {
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
};
