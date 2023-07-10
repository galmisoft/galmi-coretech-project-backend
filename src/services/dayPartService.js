import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class DayPartService {
  static async listDayParts({ date, team, shift, status }) {
    try {
      const dayParts = await prisma.report.findMany({
        select: {
            date: date !== undefined ? new Date(date) : undefined,
          team: {
            select: {
              id: equipo !== undefined ? equipo : true,
            }
          },
          shift: shift !== undefined ? Boolean(shift) : true,
          status: status !== undefined ? Number(estado) : true,
        }
      });
      return dayParts;
    } catch (error) {
      throw new Error('Failed to list day parts');
    }
  }
}
