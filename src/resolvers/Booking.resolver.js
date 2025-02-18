import { bookingService } from "../services/Booking.service.js";
import { validateUserAccess } from "../utils/request-validator.js";
export const bookingResolver = {
  Query: {
    booking: (_, args) => {
      const { id } = args;
      const payload = bookingService.booking(id);
      return payload;
    },

    bookings: async () => {
      const payload = bookingService.bookings();
      return payload;
    },
  },
  Mutation: {
    createBooking: (_, args, context) => {
      validateUserAccess(context);
      const { input } = args;
      const payload = bookingService.createBooking(input, context.user);
      return payload;
    },
    updateBooking: async (_, args, context) => {
      validateUserAccess(context);
      const { id, input } = args;
      const payload = await bookingService.updateBooking(
        id,
        input,
        context.user
      );
      return payload;
    },
    deleteBooking: async (_, args, context) => {
      validateUserAccess(context);
      const { id } = args;
      const payload = await bookingService.deleteBooking(id);
      return payload;
    },
  },
};
