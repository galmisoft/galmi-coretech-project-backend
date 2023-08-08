import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ProbeService {
  static async findProbe(probeID) {
    try {
      const Probe = await prisma.Probe.findMany({
        where: { id: probeID },
        include: {
            DayPart: {
                select: {
                    DayPartProducts: {
                        select: {
                            line: true,
                            serial_number: true,
                            brand: true,
                            matrix: true,
                            condition: true,
                            drill_bit_change: true,
                            meters_from: true,
                            meters_to: true,
                            change_motive: true
                        }
                    }    
                }
            }
        }
      });
      return Probe[0];
    } catch (error) {
      console.log(error);
      throw new Error('Failed to list Projects');
    }
  }
}
