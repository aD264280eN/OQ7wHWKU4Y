// 代码生成时间: 2025-10-03 00:00:26
import { PrismaClient } from '@prisma/client';

// Define a type for the package details
interface Package {
  name: string;
  version: string;
  description?: string;
}

// Initialize the Prisma client
const prisma = new PrismaClient();

class PackageManager {
  // Install a new package
  async installPackage(packageName: string, version: string, description?: string): Promise<void> {
    try {
      const packageExists = await prisma.package.findFirst({
        where: {
          name: packageName,
        },
      });
      if (packageExists) {
        throw new Error(`Package ${packageName} already exists.`);
      }

      await prisma.package.create({
        data: {
          name: packageName,
          version: version,
          description: description,
        },
      });
      console.log(`Package ${packageName}@${version} installed successfully.`);
    } catch (error) {
      console.error('Failed to install package:', error);
    }
  }

  // Uninstall a package
  async uninstallPackage(packageName: string): Promise<void> {
    try {
      const packageExists = await prisma.package.findFirst({
        where: {
          name: packageName,
        },
      });
      if (!packageExists) {
        throw new Error(`Package ${packageName} does not exist.`);
      }

      await prisma.package.delete({
        where: {
          name: packageName,
        },
      });
      console.log(`Package ${packageName} uninstalled successfully.`);
    } catch (error) {
      console.error('Failed to uninstall package:', error);
    }
  }

  // List all packages
  async listPackages(): Promise<void> {
    try {
      const packages = await prisma.package.findMany();
      console.log('Installed packages:');
      packages.forEach(pkg => {
        console.log(`- ${pkg.name}@${pkg.version} - ${pkg.description}`);
      });
    } catch (error) {
      console.error('Failed to list packages:', error);
    }
  }
}

// Usage example
const packageManager = new PackageManager();

// Install a package
packageManager.installPackage('prisma', '3.14.0', 'Prisma ORM for Node.js');

// List all packages
packageManager.listPackages();

// Uninstall a package
packageManager.uninstallPackage('prisma');