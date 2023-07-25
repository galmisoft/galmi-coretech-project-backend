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
        teamName: dayPart.team.name,
        date: dayPart.shift,
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

  static async createDayPartActivity(dayPartId, activityId, hours) {
    try {
      const dayPartActivity = await prisma.dayPartActivities.create({
        data: {
          dayPart_id: dayPartId,
          activity_id: activityId,
          hours,
        },
      });
      return dayPartActivity.id;
    } catch (error) {
      console.log(error)
      throw new Error(`Error creating dayPartActivity: ${error.message}`);
    }
  }

  static async createDayPartFluid(dayPartFluidsId, quantity, dayPartId = null) {
    try {
      const dayPartFluid = await prisma.dayPartFluids.create({
        data: {
          dayPartFluids_id: dayPartFluidsId,
          quantity,
          dayPartId,
        },
      });
      return dayPartFluid.id;
    } catch (error) {
      console.log(error)
      throw new Error(`Error creating dayPartFluid: ${error.message}`);
    }
  }

  static async createDayPartProduct(dayPartId, productId, condition, metersFrom, drillBitChange, endCondition, metersTo, changeMotive) {
    try {
      const dayPartProduct = await prisma.dayPartProducts.create({
        data: {
          dayPart_id: dayPartId,
          product_id: productId,
          condition,
          meters_from: metersFrom,
          drill_bit_change: drillBitChange,
          end_condition: endCondition,
          meters_to: metersTo,
          change_motive: changeMotive,
        },
      });
      return dayPartProduct.id;
    } catch (error) {
      console.log(error)
      throw new Error(`Error creating dayPartProduct: ${error.message}`);
    }
  }
  
  static async createDayPartRun(dayPartId, runId) {
    try {
      const dayPartRun = await prisma.dayPartRun.create({
        data: {
          dayPart_id: dayPartId,
          run_id: runId,
        },
      });
      return dayPartRun.id;
    } catch (error) {
      console.log(error)
      throw new Error(`Error creating dayPartRun: ${error.message}`);
    }
  }
  
  static async createDayParts(dayPartModel /* Model DayPart */) {
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
          DayPartProducts: { connectOrCreate: dayPartModel.dayPartProducts.map((dayPartProducts) => ({
            product_id: dayPartProducts.product_id,
            condition: dayPartProducts.condition,
            meters_from: dayPartProducts.meters_from,
            meters_to: dayPartProducts.meters_to,
            drill_bit_change: dayPartProducts.drill_bit_change,
            end_condition: dayPartProducts.end_condition,
            change_motive: dayPartProducts.change_motive,
          }))},
          DayPartFluids: { connectOrCreate: dayPartModel.DayPartFluids.map((DayPartFluids) => ({ 
            dayPartProducts_id: DayPartFluids.dayPartProducts_id,
            quantity: DayPartFluids.quantity
          }))},
          CompanydayPart: { connectOrCreate: {
            dayPart_id: dayPartModel.CompanydayPart.dayPart_id,
          }}},
          DayPartActivities: { connectOrCreate: dayPartModel.dayPartActivities.map((dayPartActivities) => ({ 
            activity_id: dayPartActivities.activity_id,
            hours: dayPartActivities.hours
          }))},
        })

        const DayPartRuns = await prisma.dayPartRun.createMany({
          data: newRuns.map((run) => ({
            dayPart_id: dayParts.id,
            run_id: run.id
          }))
        });
        const DayPartActivities = await prisma.DayPartActivities.createMany({
          data: dayPartModel.dayPartActivities.map((activity) => ({
            dayPart_id: dayParts.id,
            activity_id: activity.id,
            hours: activity.hours
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
