// 代码生成时间: 2025-08-14 12:09:57
import { createWriteStream, promises as fs } from 'fs';
import { createInterface } from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 定义解压目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 定义解压函数
async function unzip(zipFilePath: string, targetDir: string): Promise<void> {
  // 检查目标目录是否存在，如果不存在则创建
  try {
    await fs.access(targetDir);
  } catch {
    await fs.mkdir(targetDir, { recursive: true });
  }

  // 使用子进程执行解压缩命令
  return new Promise<void>((resolve, reject) => {
    const unzipProcess = exec(`unzip -o ${zipFilePath} -d ${targetDir}`, (error, stdout, stderr) => {
      if (error) {
        console.error('解压缩过程中发生错误:', error);
        reject(error);
      } else if (stderr) {
        console.error('解压缩过程中有错误输出:', stderr);
        reject(new Error(stderr));
      } else {
        console.log(stdout);
        resolve();
      }
    });

    // 监听子进程的stdout和stderr
    unzipProcess.stdout?.on('data', (data) => console.log(data.toString()));
    unzipProcess.stderr?.on('data', (data) => console.error(data.toString()));
  });
}

// 错误处理函数
async function handleError(error: Error): Promise<void> {
  console.error(error.message);
  // 可以在这里添加更多的错误处理逻辑
}

// 主程序
async function main() {
  try {
    // 替换为实际的zip文件路径和目标目录
    const zipFilePath = './test.zip';
    const targetDir = './extracted';
    await unzip(zipFilePath, targetDir);
  } catch (error) {
    await handleError(error as Error);
  }
}

// 执行主程序
main();
