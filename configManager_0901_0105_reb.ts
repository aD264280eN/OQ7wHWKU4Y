// 代码生成时间: 2025-09-01 01:05:39
import { PrismaClient } from '@prisma/client';

// 配置文件管理器类
class ConfigManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // 获取配置项
  async getConfig(key: string): Promise<string | null> {
    try {
      const config = await this.prisma.config.findUnique({
        where: { key },
      });
      if (!config) {
        throw new Error(`Config with key '${key}' not found`);
      }
      return config.value;
    } catch (error) {
      console.error('Failed to get config:', error);
      throw error;
    }
  }

  // 设置配置项
  async setConfig(key: string, value: string): Promise<void> {
    try {
      await this.prisma.$config.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    } catch (error) {
      console.error('Failed to set config:', error);
      throw error;
    }
  }

  // 删除配置项
  async deleteConfig(key: string): Promise<void> {
    try {
      await this.prisma.config.delete({
        where: { key },
      });
    } catch (error) {
      console.error('Failed to delete config:', error);
      throw error;
    }
  }
}

// 导出ConfigManager类
export default ConfigManager;