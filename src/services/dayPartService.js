import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class DayPartService {
  static async listDayParts({ companyId, date, team, shift, status }) {
    try {
      const listDayParts = await prisma.DayPart.findMany({
        select: {
          date: true,
          Team: {
            select: {
              name: true,
            },
          },
          status: true,
        },
        where: {
          CompanyReport: {
            company_id: companyId !== undefined ? new companyId : undefined,
          },
          date: {
            gte: date !== undefined ? new Date(date) : undefined,
          },
          team: {
            name: team !== undefined ? team : true,
          },
          shift: shift !== undefined ? Boolean(shift) : true,
          status: status !== undefined ? Number(estado) : true,
        }
      });
      const transformedlistDayParts = listDayParts.map((report) => ({
        date: report.date,
        teamName: report.team.name,
        status: report.status,
      }));
      return transformedlistDayParts
    } catch (error) {
      console.log(error)
      throw new Error('Failed to list day parts');
    }
  }
  static async dayPartData() {
    try {
      const tools = await prisma.tools.findMany({ select: { name: true } });
      const fluids = await prisma.fluids.findMany({ select: { name: true } });
      const activities = await prisma.activities.findMany({ select: { name: true } });
      const users = await prisma.user.findMany({ select: { dni: true, full_name: true } });

      res.json({ tools, fluids, activities, users });
    } catch (error) {
      throw new Error('Failed to list day parts');
    }
  }
  static async createDayParts(dayPart /* Model DayPart */) {
    try {
      const dayParts = await prisma.DayPart.create({
        data: {
          date: dayPart.date,
          shift: dayPart.shift,
          probe_id: dayPart.probe_id,
          platform: dayPart.platform,
          team_id: dayPart.team_id,
          meters_from: dayPart.meters_from,
          meters_to: dayPart.meters_to,
          total_meters: dayPart.total_meters,
          surplus_meters: dayPart.surplus_meters,
          constant_meters: dayPart.constant_meters,
          probe: { connect: { id: dayPart.probe_id } },
          team: { connect: { id: dayPart.team_id } },
          ReportTools: { create: dayPart.reportTools }, // dayPart.reportTools tiene que parsearse a que sea del tipo "Report Tools" (Otra clase)
          ReportFluidsPack: { create: dayPart.reportFluidsPack }, // 
          ReportFluids: { create: dayPart.reportFluids }, // 
          RunReport: { create: dayPart.runReport }, // 
          ActiviesReport: { create: dayPart.activiesReport }, //
          CompanyReport: { create: dayPart.companyReport } // Igual para todos estos
        }
      });
      return dayParts;
    } catch (error) {
      throw new Error('Failed to list day parts');
    }
  }
}
