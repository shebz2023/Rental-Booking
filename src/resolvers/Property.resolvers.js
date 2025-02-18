import { propertyService } from "../services/Property.service.js";
import { validateUserAccess } from "../utils/request-validator.js";
export const propertyResolver = {
  Query: {
    property: (_, args) => {
      const { id } = args;
      const payload = propertyService.Property(id);
      return payload;
    },

    properties: async () => {
      const payload = propertyService.Properties();
      return payload;
    },
  },
  Mutation: {
    createProperty: (_, args, context) => {
      validateUserAccess(context);
      const { input } = args;
      const payload = propertyService.createProperty(input, context.user);
      return payload;
    },
    updateProperty: async (_, args, context) => {
      validateUserAccess(context);
      const { id, input } = args;
      const payload = await propertyService.updateProperty(
        id,
        input,
        context.user
      );
      return payload;
    },
    deleteProperty: async (_, args, context) => {
      validateUserAccess(context);
      const { id } = args;
      const payload = await propertyService.deleteProperty(id);
      return payload;
    },
  },
};
