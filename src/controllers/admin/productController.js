import { ProductsService } from '../../services/admin/productsService.js';

export class ProductController {
  static async listProducts(req, res, next) {
    try {
      const { companyId, productType } = req.body;
      const products = await ProductsService.listProducts(companyId, productType);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createProduct(req, res, next) {
    try {
      const productModel = req.body;
      const products = await ProductsService.createProduct(productModel);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const productModel = req.body;
      const products = await ProductsService.updateProduct(productModel);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.body;
      const products = await ProductsService.deleteProduct(id);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async toggleActive(req, res, next) {
    try {
      const { id } = req.body;
      const products = await ProductsService.toggleAvailable(id);
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}
