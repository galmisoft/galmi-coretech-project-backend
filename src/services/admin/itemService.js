import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ItemsService { 
  static async listItems(companyId, ItemType, ItemName) {
    try {
      const Item = await prisma.Items.findMany({
        where: {
          Product: {
            AND: [
                {name: { contains: ItemName === undefined ? "" : ItemName }, },
                {type: { equals: ItemType === undefined ? 0 : ItemType }, },
                {company_id: { contains: companyId === undefined ? "" : companyId } }
              ]
            }
        },
        include: {
          Product: {
            select: {
              id: true,
              name: true
            }
          },
          Line: {
            select: {
              id: true,
              name: true
            }
          },
          // FALTA MMGVO
        }
      });
      return Item;
    } catch (error) {
      console.error('Error fetching Item:', error);
      throw new Error('Failed to listItems');
    }
  }
  static async createItem(ItemModel) {
    try {
      const newItem = await prisma.Items.create({
        data: {
          product_id: ItemModel.type,
          line_id: ItemModel.name,
          serial_number: ItemModel.SKU,
          unit_price: ItemModel.company_id,
          client_id: ItemModel.meassure_id,
          project_id: ItemModel.description,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return newItem;
    } catch (error) {
      console.error('Error creating Item:', error);
      throw new Error('Failed to createItem');
    }
  }  
  static async updateItem(ItemModel) {
    try {
      const updatedItem = await prisma.Items.update({
        where: {
          id: ItemModel.id,
        },
        data: {
          product_id: ItemModel.type,
          line_id: ItemModel.name,
          serial_number: ItemModel.SKU,
          unit_price: ItemModel.company_id,
          client_id: ItemModel.meassure_id,
          project_id: ItemModel.description,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return updatedItem;
    } catch (error) {
      console.error('Error updating Item:', error);
      throw new Error('Failed to updateItem');
    }
  }
  
  static async deleteItem(ItemId) {
    try {
      const deletedItem = await prisma.Items.delete({ where: { id: ItemId } });
      return deletedItem;
    } catch (error) {
      console.error('Error deleting Item:', error);
      throw new Error('Failed to deleteItem');
    }
  }

  static async toggleAvailable(ItemId) {
    try {
      const Item = await prisma.Items.findUnique({
        where: { id: ItemId }
      });

      const toggle = await prisma.Items.update({
        where: { id: ItemId }, data: { active: !Item.active },
      });
      return toggle;
    } catch (error) {
      console.error('Error toggling Item availability:', error);
      throw new Error('An error occurred while toggling Item availability');
    }
  }
}
