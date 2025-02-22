import { gql } from "apollo-server";
export const typeDefs = gql`
  type User {
    id: ID!
    googleId:String
    email: String!
    name: String
    role: Role!
    createdAt: String!
    updatedAt: String!
    createdBy: User!
    properties: [Property!]!
    bookings: [Booking!]!
  }

  type Property {
    id: ID!
    title: String!
    image: String
    description: String!
    pricePerNight: Float!
    location: String!
    host: User!
    createdAt: String!
    updatedAt: String!
    createdBy: User!
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
    createProperty(input: PropertyInput): Property!
    createBooking(input: BookingInput): Booking!
    updateUser(id: ID!, email: String, name: String, role: Role): User!
    updateProperty(id: ID!, input: PropertyInput): Property!
    updateBooking(id: ID!, input: updateBookingInput): Booking!
    deleteUser(id: ID!): User
    deleteProperty(id: ID!): Property
    deleteBooking(id: ID!): Booking
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
  input PropertyInput {
    title: String
    image: String
    description: String
    pricePerNight: Float
    location: String
    hostId: ID
  }
  input BookingInput {
    checkInDate: String!
    checkOutDate: String!
    status: BookingStatus
    renterId: ID!
    propertyId: ID!
  }
  input updateBookingInput {
    checkInDate: String
    checkOutDate: String
    status: BookingStatus
  }
  type AuthResponse {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
`;
