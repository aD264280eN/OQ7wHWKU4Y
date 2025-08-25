// 代码生成时间: 2025-08-25 11:07:02
import { PrismaClient } from '@prisma/client';

// 定义配置管理器类
class ConfigManager {
  private prisma: PrismaClient;

  constructor() {
    // 初始化 Prisma 客户端
    this.prisma = new PrismaClient();
  }

  // 从数据库获取配置
  async getConfig(key: string): Promise<string | null> {
    try {
      // 尝试从数据库中获取配置项
      const config = await this.prisma.config.findUnique({
        where: {
          key,
        },
      });

      // 如果配置项存在，返回其值
      if (config) return config.value;
      else return null;
    } catch (error) {
      // 错误处理
      console.error('Failed to get config: ', error);
      throw error;
    }
  }

  // 更新数据库中的配置
  async updateConfig(key: string, value: string): Promise<void> {
    try {
      // 尝试更新配置项
      await this.prisma.config.upsert({
        where: {
          key,
        },
        create: {
          key,
          value,
        },
        update: {
          value,
        },
      });
    } catch (error) {
      // 错误处理
      console.error('Failed to update config: ', error);
      throw error;
    }
  }

  // 关闭 Prisma 客户端连接
  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

// 实例化配置管理器
const configManager = new ConfigManager();

// 示例：获取配置
configManager.getConfig('exampleKey').then((value) => {
  console.log('Config value:', value);
}).catch((error) => {
  console.error('Error getting config:', error);
});

// 示例：更新配置
configManager.updateConfig('exampleKey', 'exampleValue').then(() => {
  console.log('Config updated successfully');
}).catch((error) => {
  console.error('Error updating config:', error);
});

// 确保程序结束时关闭 Prisma 客户端连接
process.on('exit', () => {
  configManager.close().catch(console.error);
});