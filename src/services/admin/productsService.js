import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ProductsService {
  static async listProducts(defaultCompanyID, companyID, productType) {
    try {
      const whereClause = {
        AND: {
          OR: [
            { company_id: companyID },
            { company_id: defaultCompanyID },
          ],
          type_id: productType,
        }
      };
      const products = await prisma.Product.findMany({
        where: whereClause,
        include: {
          ProductType: {
            select: {
              id: true,
              category_name: true,
            },
          },
          Meassure: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return products;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to listProducts');
    }
  }

  static async createProduct(productModel) {
    try {
      const newProduct = await prisma.Product.create({
        data: {
          type_id: productModel.type_id,
          name: productModel.description,
          company_id: productModel.company_id,
          meassure_id: productModel.meassure_id,
          description: productModel.description,
          brand: productModel.brand,
          presentation: productModel.presentation,
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
      const updatedProduct = await prisma.Product.update({
        where: {
          id: data.id,
        },
        data: {
          type_id: productModel.type_id,
          name: productModel.description,
          company_id: productModel.company_id,
          meassure_id: productModel.meassure_id,
          description: productModel.description,
          brand: productModel.brand,
          presentation: productModel.presentation,
          active: productModel.active,
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
      const deletedProduct = await prisma.Product.delete({ where: { id: productId } });
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to deleteProduct');
    }
  }

  static async toggleAvailable(productId) {
    try {
      const product = await prisma.Product.findUnique({
        where: { id: productId }
      });

      const toggle = await prisma.Product.update({
        where: { id: productId }, data: { active: !product.active },
      });
      return toggle;
    } catch (error) {
      console.error('Error toggling product availability:', error);
      throw new Error('An error occurred while toggling product availability');
    }
  }
}
