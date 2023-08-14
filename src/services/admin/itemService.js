import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ItemsService { 
  static async listItems(defaultCompanyID, companyID, productTypeID) {
    try {
      const Item = await prisma.Items.findMany({
        where: {
          AND: [
            {
              OR: [
                { Product: { company_id: defaultCompanyID } },
                { Product: { company_id: companyID } },
              ],
            },
            { 
              Product: { type_id: productTypeID }
            } 
          ]
        },
        include: {
          Product: {
            select: {
              id: true,
              description: true,
            },
          },
          DayPartProducts: {
            select: {
              id: true,
              serial_number: true,
            },
          },
        },
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
          product_id: ItemModel.product_id,
          line_id: ItemModel.line_id,
          serial_number: ItemModel.serial_number,
          unit_price: ItemModel.unit_price,
          client_id: ItemModel.client_id,
          project_id: ItemModel.project_id,
          dayPartProducts_id: ItemModel.dayPartProducts_id,
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
          product_id: ItemModel.product_id,
          line_id: ItemModel.line_id,
          serial_number: ItemModel.serial_number,
          unit_price: ItemModel.unit_price,
          client_id: ItemModel.client_id,
          project_id: ItemModel.project_id,
          dayPartProducts_id: ItemModel.dayPartProducts_id,
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
