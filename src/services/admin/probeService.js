import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ProbeService {
  static async findProbe(probeID) {
    try {
      const Probe = await prisma.Probe.findUnique({
        where: { id: probeID },
        include: {
            DayPart: {
                select: {
                    DayPartProducts: {
                        select: {
                            id: true,
                            line: true,
                            brand: true,
                            matrix: true,
                            condition: true,
                            drill_bit_change: true,
                            meters_from: true,
                            meters_to: true,
                            change_motive: true,
                            ProductType: {
                              select: {
                                id: true,
                                category_name: true
                              }
                            }
                        }
                    }    
                }
            }
        }
      });
      return Probe === null ? {} : Probe;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to list Projects');
    }
  }
}
