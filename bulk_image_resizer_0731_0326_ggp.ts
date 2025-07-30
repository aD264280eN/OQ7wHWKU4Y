// 代码生成时间: 2025-07-31 03:26:13
import { PrismaClient } from '@prisma/client';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { Sharp } from 'sharp';
import path from 'path';

// Define the configuration for resizing images
interface ResizeConfig {
  width: number;
  height: number;
  outputDir: string;
  quality?: number;
}

// Define the ImageResizer class
class ImageResizer {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Resizes images in a given directory with the specified configuration.
   * @param dirPath The path to the directory containing images to resize.
   * @param config The configuration for resizing images.
   */
  public async resizeImages(dirPath: string, config: ResizeConfig): Promise<void> {
    try {
      // Check if the directory exists
      if (!existsSync(dirPath)) {
        throw new Error(`The directory ${dirPath} does not exist.`);
      }

      // Create the output directory if it does not exist
      const { outputDir } = config;
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      // Read all files in the directory
      const files = readFileSync(dirPath, { withFileTypes: true })
        .filter( dirent => dirent.isFile() )
        .map( dirent => dirent.name );

      // Resize each image
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const outputFilePath = path.join(config.outputDir, file);

        // Use Sharp to resize the image
        await Sharp(filePath)
          .resize(config.width, config.height)
          .toFile(outputFilePath, { quality: config.quality })
          .catch(err => {
            console.error(`Failed to resize ${file}: ${err.message}`);
          });
      }

      console.log('All images have been resized successfully.');
    } catch (error) {
      console.error('Error resizing images:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

// Example usage of the ImageResizer class
const resizer = new ImageResizer();
const config: ResizeConfig = {
  width: 800,
  height: 600,
  outputDir: './resized_images',
  quality: 80 // Optional
};

resizer.resizeImages('./images', config)
  .then(() => console.log('Done resizing images'))
  .catch(error => console.error('Failed to resize images:', error));