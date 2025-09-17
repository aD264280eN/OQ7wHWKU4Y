// 代码生成时间: 2025-09-17 20:33:23
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as Prisma from '@prisma/client';

// Interface representing a file or directory
interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
}

// Class to handle file operations
class FileHandler {
  private database: Prisma.PrismaClient;

  constructor(database: Prisma.PrismaClient) {
    this.database = database;
  }

  // Function to read the contents of a directory
  public async listDirectoryContents(directoryPath: string): Promise<FileNode[]> {
    try {
      const files = await util.promisify(fs.readdir)(directoryPath, { withFileTypes: true });
      return files.map((file) => ({
        name: file.name,
        path: path.join(directoryPath, file.name),
        isDirectory: file.isDirectory(),
      }));
    } catch (error) {
      console.error(`Error reading directory contents: ${error}`);
      throw error;
    }
  }

  // Function to create a backup of a directory
  public async backupDirectory(sourcePath: string, backupPath: string): Promise<void> {
    try {
      await util.promisify(fs.copyFile)(sourcePath, backupPath);
      console.log(`Backup of ${sourcePath} created at ${backupPath}`);
    } catch (error) {
      console.error(`Error backing up directory: ${error}`);
      throw error;
    }
  }

  // Function to sync files between two directories
  public async syncDirectories(sourcePath: string, targetPath: string): Promise<void> {
    try {
      const sourceFiles = await this.listDirectoryContents(sourcePath);
      const targetFiles = await this.listDirectoryContents(targetPath);

      for (const file of sourceFiles) {
        const targetFilePath = path.join(targetPath, file.name);
        if (file.isDirectory) {
          const targetDir = targetFiles.find(f => f.name === file.name && f.isDirectory);
          if (!targetDir) {
            await util.promisify(fs.mkdir)(targetFilePath);
            console.log(`Created directory ${targetFilePath}`);
          } else {
            await this.syncDirectories(file.path, targetFilePath);
          }
        } else {
          await util.promisify(fs.copyFile)(file.path, targetFilePath);
          console.log(`Synced file ${file.path} to ${targetFilePath}`);
        }
      }

      for (const file of targetFiles) {
        if (!sourceFiles.some(f => f.name === file.name && f.path === file.path)) {
          await util.promisify(fs.rm)(path.join(targetPath, file.name), { recursive: true });
          console.log(`Removed file ${file.path} from target path`);
        }
      }
    } catch (error) {
      console.error(`Error syncing directories: ${error}`);
      throw error;
    }
  }
}

// Function to initialize the tool
async function initializeTool(database: Prisma.PrismaClient): Promise<void> {
  const fileHandler = new FileHandler(database);
  const sourcePath = './sourceDirectory'; // Replace with your source directory path
  const backupPath = './backupDirectory'; // Replace with your backup directory path
  const targetPath = './targetDirectory'; // Replace with your target directory path

  try {
    // Backup the source directory
    await fileHandler.backupDirectory(sourcePath, path.join(backupPath, 'backup.zip'));

    // Sync files between source and target directories
    await fileHandler.syncDirectories(sourcePath, targetPath);
  } catch (error) {
    console.error(`Error initializing tool: ${error}`);
  }
}

// Initialize the Prisma database client
const prisma = new Prisma.PrismaClient();

// Call the initialize function to start the tool
initializeTool(prisma);