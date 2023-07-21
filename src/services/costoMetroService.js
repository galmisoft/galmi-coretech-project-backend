import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CostoMetroService {
  static async listCostoMetro({ company_id, jobType, dateIni, dateFin, probeId, teamName }) {
    try {
      const costoMetro = await prisma.tools.findMany({
        select: {
            name: true,
        },
        where: {
            CompanydayPart : {
                company_id: company_id !== undefined ? company_id : true,
                dayPart : {
                  Team: {
                    name: teamName !== undefined ? teamName : true,
                  },
                  Probe: {
                      id: probeId !== undefined ? probeId : true,
                      job_type: jobType !== undefined ? jobType : true,
                      date_ini: {
                          gte: dateIni !== undefined ? new Date(dateIni) : true,
                      },
                      date_fin: {
                          lte: dateFin !== undefined ? new Date(dateFin) : true,
                      },
                    },
                }       
            }  
        }
      });
      const tools = costoMetro.map((entry) => entry.Tool.name);
      return tools;
    } catch (error) {
      throw new Error('Failed to list costoMetro');
    }
  }
}
