// 代码生成时间: 2025-09-12 01:31:06
import { PrismaClient } from '@prisma/client';

// Create an instance of the PrismaClient
const prisma = new PrismaClient();

class MathUtils {
  // Adds two numbers and returns the result
  add(a: number, b: number): number {
    try {
      return a + b;
    } catch (error) {
      console.error('An error occurred while adding:', error);
      throw error;
    }
  }

  // Subtracts one number from another and returns the result
  subtract(a: number, b: number): number {
    try {
      return a - b;
    } catch (error) {
      console.error('An error occurred while subtracting:', error);
      throw error;
    }
  }

  // Multiplies two numbers and returns the result
  multiply(a: number, b: number): number {
    try {
      return a * b;
    } catch (error) {
      console.error('An error occurred while multiplying:', error);
      throw error;
    }
  }

  // Divides one number by another and returns the result
  divide(a: number, b: number): number | null {
    try {
      if (b === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return a / b;
    } catch (error) {
      console.error('An error occurred while dividing:', error);
      throw error;
    }
  }

  // Calculates the square root of a number and returns the result
  sqrt(num: number): number | null {
    try {
      if (num < 0) {
        throw new Error('Cannot calculate square root of a negative number.');
      }
      return Math.sqrt(num);
    } catch (error) {
      console.error('An error occurred while calculating square root:', error);
      throw error;
    }
  }
}

// Example usage of MathUtils
const mathUtils = new MathUtils();
console.log(mathUtils.add(2, 3)); // Output: 5
console.log(mathUtils.subtract(7, 3)); // Output: 4
console.log(mathUtils.multiply(3, 4)); // Output: 12
console.log(mathUtils.divide(9, 3)); // Output: 3
console.log(mathUtils.sqrt(16)); // Output: 4

// Error handling example
try {
  console.log(mathUtils.divide(10, 0));
} catch (error) {
  console.error('Division error:', error.message);
}
try {
  console.log(mathUtils.sqrt(-4));
} catch (error) {
  console.error('Square root error:', error.message);
}

export { MathUtils };