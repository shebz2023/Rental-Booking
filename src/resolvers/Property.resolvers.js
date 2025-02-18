import { propertyService } from "../services/Property.service.js";
export const propertyResolver = {
  Query: {
    getProperty: (_, args) => {
      const { id } = args;
      const payload = propertyService.getProperty(id);
      return payload;
    },

    getProperties: async () => {
      const payload = propertyService.getProperties();
      return payload;
    },
  },
  Mutation: {
    createOneProperty: (_, args, context) => {
      const { property } = args.input;
      const payload = propertyService.createOneProperty(property, context.user);
      return payload;
    },
    updateOneProperty: async (_, args, context) => {
      const { id, update } = args.input;
      const payload = await propertyService.updateOneProperty(
        id,
        update,
        context.user
      );
      return payload;
    },
    deleteOneProperty: async (_, args, context) => {
      const { id } = args.input;
      const payload = await propertyService.deleteOneProperty(id);
      return payload;
    },
  },
};
