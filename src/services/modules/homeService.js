import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class HomeService {
    static async loadData(companyID, year, month, probe, equipment) {
        try {
            // Metros perforados Acumulado
            const result = await prisma.probe.findMany({
                select: {
                    date_ini: true,
                    date_fin: true,
                    DayPart: { select: {
                        DayPartRun: { select: {
                            Run: { select: { 
                                meters_from: true,
                                meters_to: true,
                                terrain_type1: true,
                                terrain_type2: true,
                                terrain_type3: true,
                            }}
                        }},
                        DayPartActivities: { select: { 
                            Activities: { select: { 
                                type_id: true,
                            }},
                            hours: true
                        }}
                    }}
                },
                where: {
                    company_id: companyID
                }
            })
            
        } catch (err) {
            console.log(err);
            throw new Error("Failed to list day parts");
        }
    }
}