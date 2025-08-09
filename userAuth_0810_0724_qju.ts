// 代码生成时间: 2025-08-10 07:24:24
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Define the schema for user credentials
const userCredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// Define the schema for user registration
const userRegistrationSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),
});

// Initialize the Prisma client
const prisma = new PrismaClient();

class AuthService {
  // Authenticate a user with given credentials
  async authenticateUser(credentials: z.infer<typeof userCredentialsSchema>) {
    try {
      // Validate credentials against the schema
      const parsedCredentials = userCredentialsSchema.parse(credentials);

      // Find the user in the database
      const user = await prisma.user.findUnique({
        where: { username: parsedCredentials.username },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      // Implement password hashing and comparison logic here
      // For simplicity, this example assumes password hashing is done elsewhere
      if (user.password !== parsedCredentials.password) {
        throw new Error('Invalid credentials.');
      }

      // Return a token or user information upon successful authentication
      return {
        message: 'User authenticated successfully.',
        user: {
          id: user.id,
          username: user.username,
        },
      };
    } catch (error) {
      // Handle errors
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  }

  // Register a new user with the given registration data
  async registerUser(registrationData: z.infer<typeof userRegistrationSchema>) {
    try {
      // Validate registration data against the schema
      const parsedRegistrationData = userRegistrationSchema.parse(registrationData);

      // Check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { username: parsedRegistrationData.username },
      });

      if (existingUser) {
        throw new Error('User already exists.');
      }

      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          username: parsedRegistrationData.username,
          password: parsedRegistrationData.password, // In a real application, hash the password before storing it.
          email: parsedRegistrationData.email,
        },
      });

      // Return the newly created user
      return {
        message: 'User registered successfully.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      // Handle errors
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  }
}

// Export the AuthService class
export { AuthService };
