// 代码生成时间: 2025-09-07 02:59:55
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';

// Define a class for the file backup and sync tool
export class FileBackupAndSyncTool {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Backup a file to a local or remote storage.
   *
   * @param sourcePath The path to the file to be backed up.
   * @param destPath The destination path where the file will be stored.
   */
  async backupFile(sourcePath: string, destPath: string): Promise<void> {
    try {
      // Check if the source file exists
      if (!fs.existsSync(sourcePath)) {
        throw new Error('Source file does not exist.');
      }

      // Copy the file to the destination path
      await this.copyFile(sourcePath, destPath);

      // Log the backup action
      console.log(`Backup successful: ${sourcePath} -> ${destPath}`);

    } catch (error) {
      // Handle any errors that occur during the backup process
      console.error(`Backup failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Synchronize files between two directories.
   *
   * @param sourceDirPath The path to the source directory.
   * @param destDirPath The path to the destination directory.
   */
  async syncDirectories(sourceDirPath: string, destDirPath: string): Promise<void> {
    try {
      // Check if the source directory exists
      if (!fs.existsSync(sourceDirPath)) {
        throw new Error('Source directory does not exist.');
      }

      // Check if the destination directory exists, create if not
      if (!fs.existsSync(destDirPath)) {
        fs.mkdirSync(destDirPath, { recursive: true });
      }

      // Recursively synchronize files
      await this.syncFilesRecursive(sourceDirPath, destDirPath);

      // Log the synchronization action
      console.log(`Synchronization successful: ${sourceDirPath} -> ${destDirPath}`);

    } catch (error) {
      // Handle any errors that occur during the synchronization process
      console.error(`Synchronization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Copy a file from one location to another.
   *
   * @param sourcePath The path to the source file.
   * @param destPath The path to the destination file.
   *
   * @private
   */
  private async copyFile(sourcePath: string, destPath: string): Promise<void> {
    // Use the fs.createReadStream and fs.createWriteStream to copy the file
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    return new Promise((resolve, reject) => {
      readStream.on('error', reject);
      writeStream.on('error', reject);
      readStream.on('close', resolve);
      writeStream.on('finish', resolve);
      readStream.pipe(writeStream);
    });
  }

  /**
   * Synchronize files recursively between two directories.
   *
   * @param sourceDirPath The path to the source directory.
   * @param destDirPath The path to the destination directory.
   *
   * @private
   */
  private async syncFilesRecursive(sourceDirPath: string, destDirPath: string): Promise<void> {
    // Read the contents of the source directory
    const files = fs.readdirSync(sourceDirPath);

    for (const file of files) {
      const sourceFilePath = path.join(sourceDirPath, file);
      const destFilePath = path.join(destDirPath, file);

      // Check if the current item is a file or a directory
      if (fs.statSync(sourceFilePath).isDirectory()) {
        // If it's a directory, recursively call the syncFilesRecursive method
        await this.syncFilesRecursive(sourceFilePath, destFilePath);
      } else {
        // If it's a file, copy it to the destination directory
        await this.copyFile(sourceFilePath, destFilePath);
      }
    }
  }
}

// Example usage
(async () => {
  const tool = new FileBackupAndSyncTool();

  try {
    // Backup a file
    await tool.backupFile('./example.txt', './backup/example.txt');

    // Synchronize directories
    await tool.syncDirectories('./source', './destination');

  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();