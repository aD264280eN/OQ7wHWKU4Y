// 代码生成时间: 2025-07-31 16:11:17
 * and adheres to TypeScript best practices for maintainability and scalability.
 */

import { PrismaClient } from '@prisma/client';
import { setInterval } from 'timers';
import { Task } from './models'; // Assuming a Task model is defined in a separate file

// Initialize the Prisma client
const prisma = new PrismaClient();

// Define the type for a scheduled task
interface ScheduledTask {
  task: Task;
  interval: number;
}

// The ScheduledTaskScheduler class
class ScheduledTaskScheduler {
  private tasks: ScheduledTask[] = [];

  // Add a new task to the scheduler
  public addTask(task: Task, interval: number): void {
    this.tasks.push({ task, interval });
    console.log(`Task added with interval ${interval}ms`);
  }

  // Start the scheduler
  public start(): void {
    this.tasks.forEach((scheduledTask) => {
      const { task, interval } = scheduledTask;
      console.log(`Scheduling task ${task.name} to run every ${interval}ms`);
      // Set an interval for each task
      const intervalId = setInterval(async () => {
        try {
          // Execute the task's function
          await task.execute();
          console.log(\`Task ${task.name} executed successfully\);
        } catch (error) {
          // Handle any errors that occur during task execution
          console.error(\`Error executing task ${task.name}: \${error}`);
        }
      }, interval);
    });
  }

  // Stop the scheduler and clear all intervals
  public stop(): void {
    this.tasks.forEach((scheduledTask) => {
      clearInterval(setInterval); // Replace with the actual intervalId from setInterval
    });
    console.log('Scheduler stopped');
  }

  // Close the Prisma client connection
  public async close(): Promise<void> {
    await prisma.$disconnect();
  }
}

// Example usage
const scheduler = new ScheduledTaskScheduler();

// Define a task with a name and an execute function
const exampleTask: Task = {
  name: 'Example Task',
  execute: async () => {
    // Task-specific logic here
    console.log('Executing example task');
  }
};

// Add the example task to the scheduler with a 5-second interval
scheduler.addTask(exampleTask, 5000);

// Start the scheduler
scheduler.start();

// Graceful shutdown on SIGINT signal (e.g., Ctrl+C)
process.on('SIGINT', async () => {
  console.log('Stopping scheduler...');
  scheduler.stop();
  await scheduler.close();
  process.exit(0);
});