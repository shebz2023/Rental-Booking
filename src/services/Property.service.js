import { GraphQLError } from "graphql";
import { ErrorTypes, throwCustomError, prisma } from "../utils/index.js";

const validateProperty = async (id) => {
  if (!id) {
    throwCustomError("Id is required", ErrorTypes.BAD_USER_INPUT);
  }
  const _property = await prisma.property.findUnique({ where: { id } });
  if (!_property) {
    throwCustomError("The property is not Found", ErrorTypes.BAD_REQUEST);
  }
};
export const propertyService = {
  createProperty: async (propertyData, user) => {
    try {
      const _host = await prisma.user.findUnique({
        where: { id: propertyData.hostId },
      });
      if (!_host) {
        throwCustomError("The host not found", ErrorTypes.BAD_REQUEST);
      }
      const _property = await prisma.property.create({
        data: {
          ...propertyData,
          hostId: propertyData.hostId,
          createdById: user.id,
        },
        include: {
          createdBy: true,
          host: true,
        },
      });
      return _property;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  updateProperty: async (id, input, user) => {
    try {
      await validateProperty(id);
      const _property = await prisma.property.update({
        where: { id },
        data: {
          ...input,
        },
        include: {
          createdBy: true,
          host: true,
        },
      });
      return _property;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  deleteProperty: async (id) => {
    try {
      await validateProperty(id);
      const result = await prisma.property.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  Property: async (id) => {
    try {
      const _property = await prisma.property.findUnique({
        where: { id },
        include: {
          createdBy: true,
          host: true,
        },
      });
      if (!_property) {
        throwCustomError("the property is not found", ErrorTypes.BAD_REQUEST);
      }
      return _property;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  Properties: async () => {
    try {
      const _properties = await prisma.property.findMany({
        include: {
          createdBy: true,
          host: true,
        },
      });
      return _properties;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  myProperties: async (user) => {
    try {
      const _properties = await prisma.property.findMany({
        where: { createdBy: user.id },
        include: {
          createdBy: true,
          host: true,
        },
      });
      return _properties;
    } catch (error) {
      console.log("the error is ", error);
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
};
