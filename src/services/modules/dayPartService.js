import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class DayPartService {
  static async listDayParts(date, team, shift, status) {
    try {
      const query = await prisma.DayPart.findMany({
        select: {
          date: date !== undefined ? Date(date) : true,
          Team: { select: { name: team !== undefined ? team : true, }, },
          shift: shift !== undefined ? shift : true,
          status: status !== undefined ? Number(status) : true,
        }
      });
      const listDayPart = query.map((dayPart) => ({
        date: dayPart.date,
        name: dayPart.Team.name,
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
      if ( dayPartModel.probe_id === null ){
        const newProbe = await prisma.probe.create({
          data: {
            date_ini: dayPartModel.probe.date_ini,
            azimut_ini: dayPartModel.probe.azimut_ini,
            incline_ini: dayPartModel.probe.incline_ini,
            job_type: dayPartModel.probe.job_type,
            objective_prof: dayPartModel.probe.objective_prof,
            platform: dayPartModel.probe.platform,
            level: dayPartModel.probe.level,
            labor: dayPartModel.probe.labor,
            objective_vein: dayPartModel.probe.objective_vein,
            zone: dayPartModel.probe.zone,
            horometer_ini: dayPartModel.probe.horometer_ini,
            horometer_fin: dayPartModel.probe.horometer_fin,
            finalized: dayPartModel.probe.finalized,
            date_fin: dayPartModel.probe.date_fin,
          }
        })
        dayPartModel.probe_id = newProbe.id
      }

      
      const newRuns = [];
      dayPartModel.dayPartRun.forEach( async run => {
        const createdRun = await prisma.Run.create({
          data: {
            meters_from: run.meters_from,
            meters_to: run.meters_to,
            length: run.length,
            recuperation_percentage: run.recuperation_percentage,
            terrain_type1: run.terrain_type1,
            terrain_type2: run.terrain_type2,
            terrain_type3: run.terrain_type3,
            observation: run.observation,
            picture: run.picture,
          },
        });
        newRuns.push(createdRun);
      })

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

      console.log('Creating Runs for ', dayParts.id)
      newRuns.forEach( async run => {
        const createdDayPartRun = await prisma.dayPartRun.create({
          data: {
            dayPart_id: dayParts.id,
            run_id: run.id
          }
        });
      });

      console.log('Creating Activities for ', dayParts.id)
      dayPartModel.dayPartActivities.forEach( async activity => {
        const createdDayPartActivities = await prisma.dayPartActivities.create({
          data: {
            dayPart_id: dayParts.id,
            activity_id: activity.id,
            hours: activity.hours,
            testAndMeassurements: activity.testAndMeassurements
          }
        });
      });

      console.log('Creating Fluids for ', dayParts.id)
      dayPartModel.dayPartFluids.forEach( async fluid => {
        const createddayPartFluids = await prisma.DayPartProducts.create({
          data: {
            dayPart_id: dayParts.id,
            type_id: 3,
            name: fluid.name,
            quantity: fluid.quantity
          }
        });
      });

      console.log('Creating Products for ', dayParts.id)
      dayPartModel.DayPartProducts.forEach( async product => {
        const createdDayPartProducts = await prisma.DayPartProducts.create({
          data: {
            dayPart_id: dayParts.id,
            type_id: 1,
            name: product.serial_number,
            line_id: product.line_id,
            serial_number: product.serial_number,
            brand: product.brand,
            matrix: product.matrix,
            condition: product.condition,
            meters_from: product.meters_from,
            drill_bit_change: product.drill_bit_change,
            end_condition: product.end_condition,
            meters_to: product.meters_to,
            change_motive: product.change_motive
          }
        });
      });

      console.log('Creating Persons for ', dayParts.id)
      dayPartModel.dayPartPerson.forEach( async personData => {

        const checkPerson = await prisma.person.findFirst({
          where: {
            dni: personData.dni
          }
        })
        if (checkPerson) {

          const dayPartPerson = await prisma.dayPartPerson.create({
            data: {
              dayPart_id: dayParts.id,
              person_id: checkPerson.id,
            },
          });
        } else {

          const newPerson = await prisma.person.create({
            data: {
              complete_name: personData.complete_name,
              lastname1: personData.lastname1,
              lastname2: personData.lastname2,
              dni_type: personData.dni_type,
              dni: personData.dni,
              position_id: personData.position_id,
              picture: personData.picture,
              active: personData.active,
              company_id: personData.company_id
            },
          });
          const dayPartPerson = await prisma.dayPartPerson.create({
            data: {
              dayPart_id: dayParts.id,
              person_id: newPerson.id,
            },
          });
        }
      });

      const resultDayPart = await prisma.dayPart.findFirst({
        where: {
          id: dayParts.id
        },
        include: {
          DayPartActivities: { select: { activity_id: true } },
          DayPartProducts: { select: { id: true } },
          DayPartRun: { select: { run_id: true } },
          DayPartPerson: { select: { person_id: true, } }
        }
      })

      return dayParts;
    }
    catch (error) {
      console.log(error)
      throw new Error(`Failed to create dayPart`);
    }
  }
}
