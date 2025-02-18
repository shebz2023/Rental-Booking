import { GraphQLError } from "graphql";
import { ErrorTypes, throwCustomError, prisma } from "../utils/index.js";

const validateBooking = async (id) => {
  if (!id) {
    throwCustomError("Id is required", ErrorTypes.BAD_USER_INPUT);
  }
  const _Booking = await prisma.Booking.findUnique({ where: { id } });
  if (!_Booking) {
    throwCustomError("The Booking is not Found", ErrorTypes.BAD_REQUEST);
  }
};
export const bookingService = {
  createBooking: async (BookingData, user) => {
    try {
      const _renter = await prisma.user.findUnique({
        where: { id: BookingData.renterId },
      });
      if (!_renter) {
        throwCustomError("The renter not found", ErrorTypes.BAD_REQUEST);
      }
      const _property = await prisma.property.findUnique({
        where: { id: BookingData.propertyId },
      });
      if (!_property) {
        throwCustomError("The property not found", ErrorTypes.BAD_REQUEST);
      }
      const _Booking = await prisma.Booking.create({
        data: {
          ...BookingData,
          renterId: BookingData.renterId,
          propertyId: BookingData.propertyId,
          createdById: user.id,
        },
        include: {
          renter: true,
          property: true,
        },
      });
      return _Booking;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  updateBooking: async (id, input, user) => {
    try {
      await validateBooking(id);
      const _Booking = await prisma.Booking.update({
        where: { id },
        data: {
          ...input,
        },
        include: {
          renter: true,
          property: true,
        },
      });
      return _Booking;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  deleteBooking: async (id) => {
    try {
      await validateBooking(id);
      const result = await prisma.Booking.delete({
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
  booking: async (id) => {
    try {
      const _Booking = await prisma.Booking.findUnique({
        where: { id },
        include: {
          renter: true,
          property: true,
        },
      });
      if (!_Booking) {
        throwCustomError("the Booking is not found", ErrorTypes.BAD_REQUEST);
      }
      return _Booking;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
  bookings: async () => {
    try {
      const _bookings = await prisma.Booking.findMany({
        include: {
          renter: true,
          property: true,
        },
      });
      return _bookings;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
    }
  },
};
