import { gql } from "apollo-server";
export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
    createdAt: String!
    updatedAt: String!
    properties: [Property!]!
    bookings: [Booking!]!
  }

  type Property {
    id: ID!
    title: String!
    description: String!
    pricePerNight: Float!
    location: String!
    host: User!
    createdAt: String!
    updatedAt: String!
    bookings: [Booking!]!
  }

  type Booking {
    id: ID!
    checkInDate: String!
    checkOutDate: String!
    status: BookingStatus!
    renter: User!
    property: Property!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    properties: [Property!]!
    property(id: ID!): Property
    bookings: [Booking!]!
    booking(id: ID!): Booking
  }

  type Mutation {
    signUp(email: String!, name: String, password: String, role: Role): User!
    login(email: String!, password: String!): AuthResponse!
    createProperty(
      title: String!
      description: String!
      pricePerNight: Float!
      location: String!
      hostId: ID!
    ): Property!
    createBooking(
      checkInDate: String!
      checkOutDate: String!
      status: BookingStatus
      renterId: ID!
      propertyId: ID!
    ): Booking!
    updateUser(id: ID!, email: String, name: String, role: Role): User!
    updateProperty(
      id: ID!
      title: String
      description: String
      pricePerNight: Float
      location: String
    ): Property!
    updateBooking(
      id: ID!
      checkInDate: String
      checkOutDate: String
      status: BookingStatus
    ): Booking!
    deleteUser(id: ID!): Boolean!
    deleteProperty(id: ID!): Boolean!
    deleteBooking(id: ID!): Boolean!
  }
  enum Role {
    RENTER
    HOST
  }

  enum BookingStatus {
    PENDING
    CONFIRMED
    CANCELED
  }
  type AuthResponse {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
`;
