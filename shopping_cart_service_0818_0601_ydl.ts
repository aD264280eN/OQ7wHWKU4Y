// 代码生成时间: 2025-08-18 06:01:22
import { PrismaClient } from '@prisma/client';

// Define the interface for a cart item
interface CartItem {
  id: number;
  quantity: number;
}

// Define the interface for a shopping cart
interface ShoppingCart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Initialize the Prisma client
const prisma = new PrismaClient();

class ShoppingCartService {
  // Add an item to the cart
  async addItemToCart(cartId: number, itemId: number, quantity: number): Promise<ShoppingCart> {
    try {
      // Check if the item already exists in the cart
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cartId,
          itemId: itemId,
        },
      });
      
      if (existingItem) {
        // Update the quantity of the existing item
        await prisma.cartItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: existingItem.quantity + quantity,
          },
        });
      } else {
        // Create a new cart item
        await prisma.cartItem.create({
          data: {
            cartId: cartId,
            itemId: itemId,
            quantity: quantity,
          },
        });
      }
      
      // Retrieve the updated cart
      return this.getCart(cartId);
    } catch (error) {
      throw new Error('Failed to add item to cart: ' + error.message);
    }
  }
  
  // Remove an item from the cart
  async removeItemFromCart(cartItemId: number): Promise<ShoppingCart> {
    try {
      // Delete the cart item
      await prisma.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });
      
      // Retrieve the updated cart
      const cart = await prisma.cart.findFirst({
        where: {
          cartItems: {
            some: {
              id: cartItemId,
            },
          },
        },
      });
      
      return this.getCart(cart?.id ?? 0);
    } catch (error) {
      throw new Error('Failed to remove item from cart: ' + error.message);
    }
  }
  
  // Retrieve the cart contents
  async getCart(cartId: number): Promise<ShoppingCart> {
    try {
      // Retrieve all items in the cart
      const cartItems = await prisma.cartItem.findMany({
        where: {
          cartId: cartId,
        },
      });
      
      // Calculate total quantity and price
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
      
      return {
        items: cartItems,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
      };
    } catch (error) {
      throw new Error('Failed to retrieve cart: ' + error.message);
    }
  }
}

// Example usage
const cartService = new ShoppingCartService();
cartService.addItemToCart(1, 2, 3)
  .then(cart => console.log(cart))
  .catch(error => console.error(error));
