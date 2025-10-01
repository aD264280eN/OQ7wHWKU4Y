// 代码生成时间: 2025-10-01 22:08:45
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Define error types for better error handling
class DatabaseError extends Error {}
class ValidationError extends Error {}

/**
 * VirtualLabService handles the business logic of the virtual lab.
 */
class VirtualLabService {
  
  /**
   * Create a new lab.
   * @param labName The name of the lab.
   * @returns A promise that resolves to the created lab or rejects with an error.
   */
  async createLab(labName: string): Promise<void> {
    if (!labName) {
      throw new ValidationError('Lab name is required.');
    }
    try {
      await prisma.lab.create({
        data: {
          name: labName
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific Prisma errors
        throw new DatabaseError('Failed to create lab in the database.');
      }
      throw error;
    }
  }

  /**
   * Get all labs.
   * @returns A promise that resolves to an array of labs.
   */
  async getAllLabs(): Promise<Lab[]> {
    try {
      return await prisma.lab.findMany();
    } catch (error) {
      throw new DatabaseError('Failed to retrieve labs from the database.');
    }
  }
}

// Define the type for Lab
interface Lab {
  id: number;
  name: string;
}

// Example usage of the VirtualLabService
(async () => {
  const labService = new VirtualLabService();
  try {
    await labService.createLab('Chemistry Lab');
    const labs = await labService.getAllLabs();
    console.log('Labs:', labs);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof DatabaseError) {
      console.error('Database error:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
})();