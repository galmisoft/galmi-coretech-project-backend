import { PrismaClient } from "@prisma/client";
import { transformJson, transformPrisma } from "../../model/dayPartModel.js";
const prisma = new PrismaClient();

export class DayPartService {
  static async listDayParts(date, team, shift, status) {
    try {
      const query = await prisma.DayPart.findMany({
        select: {
          id: true,
          date: date !== undefined ? Date(date) : true,
          shift: shift !== undefined ? shift : true,
          status: status !== undefined ? Number(status) : true,
          Probe: {
            select: {
              id: true,
              probe_number: true,
            },
          },
          User: {
            select: {
              Assignation: {
                select: {
                  Equipment: {
                    select: {
                      id: true,
                      internal_code: true,
                      mine_code: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const listDayPart = query.map((dayPart) => ({
        id: dayPart.id,
        date: dayPart.date,
        name: dayPart.User?.Assignation[0]?.Equipment?.internal_code ?? "",
        shift: dayPart.shift === true ? "Día" : "Noche",
        status: dayPart.status,
        Probe: dayPart.Probe,
      }));
      return listDayPart;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to list day parts");
    }
  }
  static async getDayPart(dayPartID) {
    try {
      const query = await prisma.DayPart.findUnique({
        where: {
          id: dayPartID,
        },
        include: {
          User: {
            select: {
              Assignation: {
                select: {
                  Client: {
                    select: {
                      id: true,
                      name: true,
                      comercial_name: true,
                    },
                  },
                  Equipment: {
                    select: {
                      id: true,
                      internal_code: true,
                      mine_code: true,
                    },
                  },
                },
              },
            },
          },
          Probe: {
            select: {
              id: true,
              Company: {
                select: {
                  name: true,
                },
              },
              Project: {
                select: {
                  id: true,
                  name: true,
                },
              },
              probe_number: true,
              date_ini: true,
              azimut_ini: true,
              incline_ini: true,
              job_type: true,
              objective_prof: true,
              platform: true,
              level: true,
              labor: true,
              objective_vein: true,
              zone: true,
              horometer_ini: true,
              horometer_fin: true,
              finalized: true,
              date_fin: true,
            },
          },
          DayPartRun: {
            select: {
              id: true,
              run_id: true,
              Run: {
                select: {
                  id: true,
                  meters_from: true,
                  meters_to: true,
                  length: true,
                  recuperation_percentage: true,
                  terrain_type1: true,
                  terrain_type2: true,
                  terrain_type3: true,
                  observation: true,
                  picture: true,
                },
              },
            },
          },
          DayPartProducts: {
            select: {
              id: true,
              line: true,
              serial_number: true,
              type_id: true,
              brand: true,
              matrix: true,
              condition: true,
              meters_from: true,
              meters_to: true,
              drill_bit_change: true,
              end_condition: true,
              change_motive: true,
              ProductType: {
                select: {
                  id: true,
                  category_name: true,
                },
              },
            },
          },
          DayPartActivities: {
            select: {
              id: true,
              activity_id: true,
              hours: true,
              Activities: {
                select: {
                  id: true,
                  name: true,
                  ActivityType: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          DayPartPerson: {
            select: {
              id: true,
              person_id: true,
              Person: {
                select: {
                  id: true,
                  complete_name: true,
                  lastname1: true,
                  lastname2: true,
                  dni_type: true,
                  dni: true,
                  position_id: true,
                  picture: true,
                  DniType: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  Position: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          DayPartFluids: {
            select: {
              id: true,
              fluid_id: true,
              quantity: true,
              Product: {
                select: {
                  id: true,
                  name: true,
                  meassure_id: true,
                  description: true,
                  brand: true,
                  presentation: true,
                  Meassure: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          DayPartTest: {
            select: {
              id: true,
              depth: true,
              azimut: true,
              inclination: true,
              supervisor_name: true,
              company_name: true,
              magnetic_intensity: true,
              efective: true,
            },
          },
        },
      });
      return transformPrisma(query);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to list day parts");
    }
  }

  static async createDayParts(JsonBody, files) {
    const dayPartModel = await transformJson(JsonBody, files);

    try {
      if (dayPartModel.probe_id === null) {
        const newProbe = await prisma.probe.create({
          data: {
            company_id: dayPartModel.probe.company_id,
            project_id: dayPartModel.probe.project_id,
            probe_number: dayPartModel.probe.probe_number,
            date_ini: new Date(dayPartModel.probe.date_ini),
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
            date_fin: new Date(dayPartModel.probe.date_ini),
          },
        });
        dayPartModel.probe_id = newProbe.id;
      }

      console.log("Creating Run");
      const newRuns = [];
      for (const run of dayPartModel.dayPartRun) {
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
      }

      console.log("Creating DayPart");
      const dayParts = await prisma.DayPart.create({
        data: {
          date: new Date(dayPartModel.date),
          shift: dayPartModel.shift,
          status: dayPartModel.status,
          probe_id: dayPartModel.probe_id,
          meters_from: dayPartModel.meters_from,
          meters_to: dayPartModel.meters_to,
          surplus_meters: dayPartModel.surplus_meters,
          constant_meters: dayPartModel.constant_meters,
          user_id: dayPartModel.user_id,
          M1: dayPartModel.m1,
          M2: dayPartModel.m2,
          M3: dayPartModel.m3,
          M4: dayPartModel.m4,
          PH: dayPartModel.ph,
          PPM: dayPartModel.ppm,
          fluid_return: dayPartModel.fluid_return,
          signature: dayPartModel.signature,

          created_At: new Date(),
          updated_At: new Date(),
        },
      });

      console.log("Creating Runs for ", dayParts.id);
      for (const run of newRuns) {
        await prisma.DayPartRun.create({
          data: {
            dayPart_id: dayParts.id,
            run_id: run.id,
          },
        });
      }

      console.log("Creating Activities for ", dayParts.id);
      for (const activity of dayPartModel.DayPartActivities) {
        await prisma.DayPartActivities.create({
          data: {
            dayPart_id: dayParts.id,
            activity_id: activity.id,
            hours: activity.hours,
          },
        });
      }

      console.log("Creating Fluids for ", dayParts.id);
      for (const fluid of dayPartModel.DayPartFluids) {
        await prisma.DayPartFluids.create({
          data: {
            dayPart_id: dayParts.id,
            fluid_id: fluid.id,
            quantity: fluid.quantity,
          },
        });
      }

      console.log("Creating DayPartTest for ", dayParts.id);
      for (const test of dayPartModel.DayPartTest) {
        await prisma.DayPartTest.create({
          data: {
            dayPart_id: dayParts.id,
            depth: test.depth,
            azimut: test.azimut,
            inclination: test.azimut,
            supervisor_name: test.supervisor_name,
            company_name: test.company_name,
            magnetic_intensity: test.magnetic_intensity,
            efective: test.active ? test.active : true,
          },
        });
      }

      console.log("Creating Products for ", dayParts.id);
      for (const product of dayPartModel.DayPartProducts) {
        const createdDayPartProducts = await prisma.DayPartProducts.create({
          data: {
            dayPart_id: dayParts.id,
            serial_number: product.serial_number,
            type_id: 1,
            line: product.line,
            brand: product.brand,
            matrix: product.matrix,
            condition: product.condition,
            meters_from: product.meters_from,
            drill_bit_change: product.drill_bit_change,
            end_condition: product.end_condition,
            meters_to: product.meters_to,
            change_motive: product.change_motive,
          },
        });
      }

      console.log("Creating Persons for ", dayParts.id);
      for (const personData of dayPartModel.DayPartPerson) {
        const dayPartPerson = await prisma.DayPartPerson.create({
          data: {
            dayPart_id: dayParts.id,
            person_id: personData.person_id,
          },
        });
      }

      const resultDayPart = await prisma.dayPart.findFirst({
        where: {
          id: dayParts.id,
        },
        include: {
          DayPartActivities: { select: { activity_id: true } },
          DayPartProducts: { select: { id: true } },
          DayPartRun: { select: { run_id: true } },
          DayPartPerson: { select: { person_id: true } },
        },
      });

      return dayParts;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to create dayPart`);
    }
  }
}
