// 代码生成时间: 2025-09-08 21:45:42
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// 创建一个PrismaClient实例
const prisma = new PrismaClient();

// 定义一个接口用于描述导出的Excel数据结构
interface ExcelDataRow {
  [key: string]: string | number;
}

// 定义导出Excel文件的函数
async function exportExcel<T>(data: T[], fileName: string): Promise<void> {
  try {
    // 创建一个新的工作簿
    const workbook = XLSX.utils.book_new();

    // 将数据转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 生成Excel文件的二进制字符串
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // 将二进制字符串写入文件系统
    const filePath = path.join(__dirname, '..', 'exports', `${fileName}.xlsx`);
    fs.writeFileSync(filePath, excelBuffer);

    console.log(`Excel文件已生成: ${filePath}`);
  } catch (error) {
    console.error('导出Excel文件时发生错误:', error);
  }
}

// 示例：导出用户数据到Excel
async function exportUserData(): Promise<void> {
  try {
    // 从数据库查询用户数据
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // 调用导出函数
    await exportExcel(users, 'users');
  } catch (error) {
    console.error('查询用户数据时发生错误:', error);
  }
}

// 执行导出操作
exportUserData();