import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class DayPartService {
  static async listDayParts({ team, status }) {
    try {
      const query = await prisma.DayPart.findMany({
        select: {
          date: true,
          Team: { select: { name: true } },
          shift: true,
          status: true,
        },
        where: {
          team: { name: team !== undefined ? team : true, },
          status: status !== undefined ? Number(status) : true,
        }
      });
      const listDayPart = query.map((dayPart) => ({
        date: dayPart.date,
        name: dayPart.team.name,
        shift: dayPart.shift === true ? 'Día' : 'Noche',
        status: dayPart.status,
      }));
      return listDayPart
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
  
  static async createDayParts(dayPartModel) {
    try {
      const newRuns = await prisma.Run.createMany({
        data: dayPartModel.dayPartRun.map((run) => ({
            id: run.run_id, 
            meters_from: run.meters_from, 
            meters_to: run.meters_to,
            length: run.length,
            recuperation_percentage: run.recuperation_percentage,
            terrain_type1: run.terrain_type1, 
            terrain_type2: run.terrain_type2,
            terrain_type3: run.terrain_type3,
            observation: run.observation,
            picture: run.picture
        }))
      });

      const dayParts = await prisma.DayPart.create({
        data: {
            date: new Date(dayPartModel.date),
            shift: dayPartModel.shift,
            status: dayPartModel.status,
            probe_id: dayPartModel.probe_id,
            team_id: dayPartModel.team_id,
            meters_from: dayPartModel.meters_from,
            meters_to: dayPartModel.meters_to,
            surplus_meters: dayPartModel.surplus_meters,
            constant_meters: dayPartModel.constant_meters,
            M1: dayPartModel.m1,
            M2: dayPartModel.m2,
            M3: dayPartModel.m3,
            M4: dayPartModel.m4,
            PH: dayPartModel.ph,
            PPM: dayPartModel.ppm,
            created_At: new Date(),
            updated_At: new Date(),
          }
        })

        const DayPartRuns = await prisma.dayPartRun.createMany({
          data: newRuns.map((run) => ({
            dayPart_id: dayParts.id,
            run_id: run.id
          }))
        });
        const DayPartActivities = await prisma.DayPartProducts.createMany({
          data: dayPartModel.dayPartActivities.map((activity) => ({
            dayPart_id: dayParts.id,
            activity_id: activity.id,
            hours: activity.hours
          }))
        });
        const dayPartFluids = await prisma.DayPartProducts.createMany({
          data: dayPartModel.dayPartFluids.map((fluids) => ({
            dayPart_id: dayParts.id,
            activity_id: fluids.id,
            hours: fluids.hours
          }))
        });
        const DayPartProducts = await prisma.DayPartProducts.createMany({
          data: dayPartModel.DayPartProducts.map((product) => ({
            dayPart_id: dayParts.id,
            activity_id: product.id,
            hours: product.hours
          }))
        });

        return dayParts;
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to create dayPart');
    }
  }
}
