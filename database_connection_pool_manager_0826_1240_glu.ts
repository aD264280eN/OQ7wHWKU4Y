// 代码生成时间: 2025-08-26 12:40:22
import { PrismaClient } from '@prisma/client';

// DatabaseConnectionPoolManager 类负责管理数据库连接池
class DatabaseConnectionPoolManager {
  private prisma: PrismaClient;

  constructor() {
    // 初始化 Prisma 客户端
    this.prisma = new PrismaClient({
      // 错误处理
      errorFormat: 'minimal',
    });
  }

  // 获取连接池状态
  async getPoolStatus(): Promise<string> {
    try {
      // 获取连接池状态信息
      const poolStatus = await this.prisma.$ pooledDebug();
      return JSON.stringify(poolStatus);
    } catch (error) {
      // 错误处理
      console.error('Error fetching pool status:', error);
      throw new Error('Failed to fetch pool status');
    }
  }

  // 关闭数据库连接池
  async disconnect(): Promise<void> {
    try {
      // 关闭 Prisma 客户端连接池
      await this.prisma.$disconnect();
    } catch (error) {
      // 错误处理
      console.error('Error disconnecting:', error);
      throw new Error('Failed to disconnect');
    }
  }

  // 获取 Prisma 客户端实例
  getPrismaClient(): PrismaClient {
    return this.prisma;
  }
}

// 导出 DatabaseConnectionPoolManager 类
export default DatabaseConnectionPoolManager;