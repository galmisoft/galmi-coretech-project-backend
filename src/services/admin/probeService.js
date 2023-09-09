import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { transformPrisma } from "../../model/probeModel.js";

export class ProbeService {
  static async findProbe(probeID) {
    try {
      const probeResult = await prisma.Probe.findUnique({
        where: { id: probeID },
        include: {
          DayPart: {
            select: {
              meters_from: true,
              meters_to: true,
              constant_meters: true,
              DayPartProducts: {
                select: {
                  id: true,
                  serial_number: true,
                  type_id: true,
                  line: true,
                  brand: true,
                  matrix: true,
                  condition: true,
                  drill_bit_change: true,
                  meters_from: true,
                  meters_to: true,
                  change_motive: true,
                  end_condition: true,
                  ProductType: {
                    select: {
                      id: true,
                      category_name: true,
                    },
                  },
                },
                orderBy: { created_At: "desc" },
                take: 1,
              },
            },
            orderBy: { created_At: "desc" },
            take: 1,
          },
        },
      });
      const probe = transformPrisma(probeResult);
      return probe === null ? {} : probe;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to list Projects");
    }
  }
}
