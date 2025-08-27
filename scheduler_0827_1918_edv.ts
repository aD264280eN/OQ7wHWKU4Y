// 代码生成时间: 2025-08-27 19:18:50
import { PrismaClient } from '@prisma/client';
import { scheduleJob } from 'node-cron';

// Define the Prisma Client
const prisma = new PrismaClient();

// Define the Task model
interface Task {
  id: number;
  cronExpression: string;
  command: string;
}

class Scheduler {
  /**
   * Schedule a task
   */
  public async scheduleTask(task: Task): Promise<void> {
    try {
      // Save the task to the database
      await prisma.task.create({
        data: {
          cronExpression: task.cronExpression,
          command: task.command,
        },
      });

      // Schedule the task using node-cron
      scheduleJob(task.cronExpression, async () => {
        console.log(`Task ${task.id} is running...`);
        try {
          // Here you would execute the command or any other logic
          // For demonstration purposes, we just log the task's command
          console.log(`Executing command: ${task.command}`);
        } catch (error) {
          console.error(`Error executing task ${task.id}: ${error}`);
        }
      });
    } catch (error) {
      console.error(`Error scheduling task: ${error}`);
      throw error;
    }
  }

  /**
   * Remove a scheduled task
   */
  public async unscheduleTask(taskId: number): Promise<void> {
    try {
      // Remove the task from the database
      await prisma.task.delete({
        where: { id: taskId },
      });

      // Find and cancel the scheduled job
      const jobs = scheduleJob.list();
      for (const job of jobs) {
        if (taskCronExpression === job.scheduled) {
          job.cancel();
          break;
        }
      }
    } catch (error) {
      console.error(`Error unscheduling task ${taskId}: ${error}`);
      throw error;
    }
  }
}

// Export the Scheduler class
export default Scheduler;