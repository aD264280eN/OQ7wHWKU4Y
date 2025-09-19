// 代码生成时间: 2025-09-19 21:43:26
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

// Define the user schema using Zod for input validation
const userSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8),
});

// Define the prisma instance
const prisma = new PrismaClient();

// Function to hash the password
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Function to authenticate a user
const authenticateUser = async (username: string, password: string) => {
  // Validate input
  const input = userSchema.parse({ username, password });

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username: input.username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the hashed password with the one stored in the database
    const isPasswordMatch = await bcrypt.compare(input.password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Incorrect password');
    }

    // Authentication successful
    return { success: true, message: 'User authenticated successfully' };
  } catch (error) {
    // Handle errors
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Example usage
const runAuthentication = async () => {
  try {
    const result = await authenticateUser('testUser', 'testPassword123');
    console.log(result);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

runAuthentication();
