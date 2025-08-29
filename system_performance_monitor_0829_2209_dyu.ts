// 代码生成时间: 2025-08-29 22:09:43
import { PrismaClient } from '@prisma/client';

// Define the Prisma client
const prisma = new PrismaClient();

// Define the system performance entity model
interface SystemPerformance {
  id: number;
  cpuUsage: string;
  memoryUsage: string;
  timestamp: Date;
}

// Define the SystemPerformanceService class
class SystemPerformanceService {
  async getSystemPerformance(): Promise<SystemPerformance[]> {
    try {
      // Query the database for system performance records
      return await prisma.systemPerformance.findMany();
    } catch (error) {
      // Handle any errors that occur during the query
      console.error('Error fetching system performance data:', error);
      throw error;
    }
  }

  async recordSystemPerformance(cpuUsage: string, memoryUsage: string): Promise<SystemPerformance> {
    try {
      // Insert a new system performance record into the database
      return await prisma.systemPerformance.create({
        data: {
          cpuUsage,
          memoryUsage,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      // Handle any errors that occur during the creation process
      console.error('Error recording system performance data:', error);
      throw error;
    }
  }
}

// Define the SystemPerformanceController class
class SystemPerformanceController {
  private systemPerformanceService: SystemPerformanceService;

  constructor() {
    this.systemPerformanceService = new SystemPerformanceService();
  }

  async getSystemPerformanceData(): Promise<SystemPerformance[]> {
    return this.systemPerformanceService.getSystemPerformance();
  }

  async recordSystemPerformanceData(cpuUsage: string, memoryUsage: string): Promise<SystemPerformance> {
    return this.systemPerformanceService.recordSystemPerformance(cpuUsage, memoryUsage);
  }
}

// Export the controller for use in other modules
export default SystemPerformanceController;