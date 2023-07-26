import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EquipmentService {
  static async listEquipments(companyID, clientName) {
    try {
      const Equipments = await prisma.Equipment.findMany({
        where: {
          Client: { 
            AND: [
                { company_id: { contains: companyID === undefined ? "" : companyID } },
                { comercial_name: { contains: clientName === undefined ? "" : clientName } }
            ],
        }
        }
      });
      return Equipments;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to list Equipments');
    }
  }
  static async createEquipment(EquipmentData) {
    try {
      const Equipment = await prisma.Equipment.create({
        data: {
          name: EquipmentData.name,
          client_id: EquipmentData.client_id,
          internal_code: EquipmentData.internal_code,
          mine_code: EquipmentData.mine_code,
          brand: EquipmentData.brand,
          cfm: EquipmentData.cfm,
          rpm: EquipmentData.rpm,
          preasure: EquipmentData.preasure,
          status: EquipmentData.status,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return Equipment;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create Equipment');
    }
  }
  static async updateEquipment(EquipmentData) {
    try {
      const Equipment = await prisma.Equipment.update({
        where: {
          id: EquipmentData.id,
        },
        data: {
            name: EquipmentData.name,
            client_id: EquipmentData.client_id,
            internal_code: EquipmentData.internal_code,
            mine_code: EquipmentData.mine_code,
            brand: EquipmentData.brand,
            cfm: EquipmentData.cfm,
            rpm: EquipmentData.rpm,
            preasure: EquipmentData.preasure,
            status: EquipmentData.status,
            updated_At: new Date(),
        },
      });
      return Equipment;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to update Equipment');
    }
  }
  static async deleteEquipment(EquipmentId) {
    try {
      const Equipment = await prisma.Equipment.delete({ where: { id: EquipmentId } });
      return Equipment;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to delete Equipment');
    }
  }
}
