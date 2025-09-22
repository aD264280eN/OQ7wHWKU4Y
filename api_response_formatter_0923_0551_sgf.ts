// 代码生成时间: 2025-09-23 05:51:44
import { PrismaClient } from '@prisma/client';
// 初始化Prisma客户端
const prisma = new PrismaClient();

// API响应格式化工具类
class ApiResponseFormatter {
    /**
     * 格式化成功的API响应
     * @param data 响应数据
     * @returns 格式化后的响应对象
     */
    public static success<T>(data: T): any {
        return {
            status: 'success',
            statusCode: 200,
            data: data
        };
    }

    /**
     * 格式化失败的API响应
     * @param message 错误信息
     * @param statusCode HTTP状态码
     * @returns 格式化后的错误响应对象
     */
    public static error(message: string, statusCode: number = 500): any {
        return {
            status: 'error',
            statusCode: statusCode,
            message: message
        };
    }

    /**
     * 处理API请求并格式化响应
     * @param promise API请求的Promise对象
     * @returns 格式化后的响应对象
     */
    public static async handleApiRequest<T>(promise: Promise<T>): Promise<any> {
        try {
            const data = await promise;
            return this.success(data);
        } catch (error: any) {
            console.error('API Request Error:', error);
            return this.error(error.message, error.statusCode || 500);
        }
    }
}

// 示例：使用ApiResponseFormatter类格式化API响应
async function exampleApiCall() {
    const prismaPromise = prisma.user.findMany(); // 示例：查询用户数据
    const formattedResponse = await ApiResponseFormatter.handleApiRequest(prismaPromise);
    console.log(formattedResponse);
}

// 调用示例API调用
exampleApiCall().catch(console.error);