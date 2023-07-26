import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ProductsService { 
  static async listProducts(companyId, productType, productName) {
    try {
      const product = await prisma.product.findMany({
        where: {
          name: { contains: productName === undefined ? "" : productName },
          type: { contains: productType === undefined ? "" : productType },
          company_id: { contains: companyId === undefined ? "" : companyId }
        },
      });
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to listProducts');
    }
  }
  static async createProduct(productModel) {
    try {
      const newProduct = await prisma.product.create({
        data: {
          type: productModel.type,
          name: productModel.name,
          SKU: productModel.SKU,
          company_id: productModel.company_id,
          meassure_id: productModel.meassure_id,
          description: productModel.description,
          brand: productModel.brand,
          line_id: productModel.line_id,
          serial_number: productModel.serial_number,
          active: productModel.active,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to createProduct');
    }
  }  
  static async updateProduct(data) {
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: data.id,
        },
        data: {
            type: data.type,
            name: data.name,
            SKU: data.SKU,
            brand: data.brand,
            line_id: data.line_id,
            serial_number: data.serial_number,
            updated_At: new Date(),
        },
      });
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to updateProduct');
    }
  }
  
  static async deleteProduct(productId) {
    try {
      const deletedProduct = await prisma.product.delete({ where: { id: productId } });
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to deleteProduct');
    }
  }

  static async toggleAvailable(productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId }
      });

      const toggle = await prisma.product.update({
        where: { id: productId }, data: { active: !product.active },
      });
      return toggle;
    } catch (error) {
      console.error('Error toggling product availability:', error);
      throw new Error('An error occurred while toggling product availability');
    }
  }
}
