// 代码生成时间: 2025-10-09 03:01:26
import { PrismaClient } from '@prisma/client';

// Define the model according to the Prisma schema
export class OnlineLearningPlatform {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Create a new user
  async createUser(data: { name: string; email: string }): Promise<any> {
    try {
      return await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<any> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw new Error('Failed to get user by email');
    }
  }

  // Update user data
  async updateUser(id: number, data: { name?: string; email?: string }): Promise<any> {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: data,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  // Delete a user
  async deleteUser(id: number): Promise<any> {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  // Create a new course
  async createCourse(data: { title: string; description: string; }): Promise<any> {
    try {
      return await this.prisma.course.create({
        data: {
          title: data.title,
          description: data.description,
        },
      });
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error('Failed to create course');
    }
  }

  // Get all courses
  async getAllCourses(): Promise<any> {
    try {
      return await this.prisma.course.findMany();
    } catch (error) {
      console.error('Error getting all courses:', error);
      throw new Error('Failed to get all courses');
    }
  }

  // Add a user to a course
  async addUserToCourse(userId: number, courseId: number): Promise<any> {
    try {
      return await this.prisma.userCourse.create({
        data: {
          user: { connect: { id: userId } },
          course: { connect: { id: courseId } },
        },
      });
    } catch (error) {
      console.error('Error adding user to course:', error);
      throw new Error('Failed to add user to course');
    }
  }

  // Close the Prisma client connection
  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

// Usage example
// const platform = new OnlineLearningPlatform();
// platform.createUser({ name: 'John Doe', email: 'johndoe@example.com' });