// 代码生成时间: 2025-09-11 04:01:27
import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Define the ImageResizingError class to handle resizing errors
class ImageResizingError extends Error {
  constructor(message: string) {
# NOTE: 重要实现细节
    super(message);
    this.name = 'ImageResizingError';
  }
}

// Define the configuration for resizing
interface ResizeConfig {
# 优化算法效率
  width: number;
# 优化算法效率
  height: number;
  outputPath: string;
}

// Define the ImageResizer class
class ImageResizer {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Function to resize images based on config
# 改进用户体验
  public async resizeImages(inputDir: string, config: ResizeConfig): Promise<void> {
    // Check if the output directory exists, if not, create it
    if (!fs.existsSync(config.outputPath)) {
      fs.mkdirSync(config.outputPath, { recursive: true });
# NOTE: 重要实现细节
    }

    // Read all files from the input directory
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
      const filePath = path.join(inputDir, file);

      try {
        // Check if the file is an image by checking the extension
        if (!filePath.match(/\.(jpeg|jpg|gif|png)$/)) {
          continue;
        }

        // Read the image and resize it
        const buffer = await sharp(filePath).resize({ width: config.width, height: config.height }).toBuffer();

        // Save the resized image to the output directory
        const outputFilePath = path.join(config.outputPath, file);
        fs.writeFileSync(outputFilePath, buffer);
      } catch (error) {
        // Handle any errors that occur during the resizing process
# FIXME: 处理边界情况
        throw new ImageResizingError(`Failed to resize image: ${filePath}. Error: ${error.message}`);
      }
    }
  }

  // Function to clean up resources
  public async close(): Promise<void> {
    await this.prisma.$disconnect();
# FIXME: 处理边界情况
  }
}
# 扩展功能模块

// Example usage
const main = async () => {
  const imageResizer = new ImageResizer();

  try {
    await imageResizer.resizeImages('./input', {
      width: 800,
      height: 600,
      outputPath: './output',
    });
  } catch (error) {
    if (error instanceof ImageResizingError) {
      console.error(error.message);
    } else {
      console.error('An unexpected error occurred:', error);
# NOTE: 重要实现细节
    }
  } finally {
    await imageResizer.close();
  }
};

// Run the main function
main().catch(console.error);