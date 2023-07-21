import { ProductsService } from '../services/productsService.js';

export class ProductController {
  static async listProducts(req, res, next) {
    try {
      const { companyId } = req.query;
      const products = await ProductsService.listProducts(companyId);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async createProduct(req, res, next) {
    try {
      const { productModel } = req.query;
      const products = await ProductsService.createProduct(productModel);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const { productModel } = req.query;
      const products = await ProductsService.updateProduct(productModel);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { productID } = req.query;
      const products = await ProductsService.deleteProduct(productID);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async toggleActive(req, res, next) {
    try {
      const { productID } = req.query;
      const products = await ProductsService.toggleAvailable(productID);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
