import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function findActivityByDescription(desc) {
    try {
        const query = await prisma.activities.findFirst({
          select: {
            id: true
          },
          where: { name: desc }
        });
        console.log('findActivityByDescription', query)
        return query.id
      } catch (error) {
        console.log(error)
        throw new Error('Failed to findActivityByDescription');
      }
}

async function findFluidsByDescription(desc) {
    try {
        const query = await prisma.inputJson.herramientas[Product].findFirst({
          select: { id: true },
          where: {
            AND: [{ description: desc }, { type_id: 3 } ]
          }
        });
        console.log('findFluidsByDescription', query)
        return query.id
      } catch (error) {
        console.log(error)
        throw new Error('Failed to findActivityByDescription');
      }
}

export default function transformJson(inputJson) {
    const DayPartRun = []
    for ( const corrida in inputJson.corridas ) {
        DayPartRun.push({
            meters_from: inputJson.corridas[corrida].desde,
            meters_to: inputJson.corridas[corrida].hasta,
            length: inputJson.corridas[corrida].longitud,
            recuperation_percentage: inputJson.corridas[corrida].recuperacion,
            terrain_type1: inputJson.corridas[corrida].terreno1,
            terrain_type2: inputJson.corridas[corrida].terreno2,
            terrain_type3: inputJson.corridas[corrida].terreno3,
            observation: inputJson.corridas[corrida].observacion,
            picture: inputJson.corridas[corrida].foto
        })
    }

    const DayPartActivities = []
    for ( const activity in inputJson.actividades ) {
        DayPartActivities.push({
            id: inputJson.actividades[activity].id,
            type_id: inputJson.actividades[activity].type_id,
            hours: inputJson.actividades[activity].horas 
        })
    }

    const DayPartFluids = []
    for ( const fluid in inputJson.fluidos.fluidos ){
        DayPartFluids.push({
            id: inputJson.fluidos.fluidos[fluid].id,
            quantity: inputJson.fluidos.fluidos[fluid].cantidad
        })
    }

    const DayPartTest = []
    for ( const test in inputJson.medicionesSondaje) {
        DayPartTest.push({
            depth: inputJson.medicionesSondaje[test].profundidad,
            azimut: inputJson.medicionesSondaje[test].azimut,
            inclination: inputJson.medicionesSondaje[test].inclinacion,
            supervisor_name: inputJson.medicionesSondaje[test].nombre,
            company_name: inputJson.medicionesSondaje[test].empresa,
            magnetic_intensity: inputJson.medicionesSondaje[test].intensidad,
            efective: inputJson.medicionesSondaje[test].tiroEfectivo === 'si'
        })
    }

    const DayPartProducts = []
    for ( const product in inputJson.herramientas ) {
        DayPartProducts.push({
            line: inputJson.herramientas[product].linea,
            type_id: inputJson.herramientas[product].type_id,
            serial_number: inputJson.herramientas[product].nroSerie,
            brand: inputJson.herramientas[product].marca,
            matrix: inputJson.herramientas[product].matriz,
            condition: inputJson.herramientas[product].condicionEntrada,
            meters_from: inputJson.herramientas[product].desde,
            drill_bit_change: inputJson.herramientas[product].cambio,
            end_condition: inputJson.herramientas[product].condicionSalida,
            meters_to: inputJson.herramientas[product].hasta,
            change_motive: inputJson.herramientas[product].motivoCambio
        })
    }

    const DayPartPerson = []
    for ( const person in inputJson.personal ) {
        DayPartPerson.push({
            person_id: inputJson.personal[person].id
        })
    }

    const output = {
        date: inputJson.datos_generales.fechaParteDiario,
        shift: inputJson.datos_generales.turno,
        status: inputJson.datos_generales.sondajeTerminado === true ? 1 : 0,
        probe_id: inputJson.datos_generales.sondaje_id ? inputJson.datos_generales.sondaje_id : null,
        probe: {
            probe_number: inputJson.datos_generales.nroSondaje,
            date_ini: inputJson.datos_generales.inicioSondaje,
            azimut_ini: inputJson.datos_generales.azimut,
            incline_ini: inputJson.datos_generales.inclinacion,
            job_type: inputJson.datos_generales.tipoTrabajo,
            objective_prof: inputJson.datos_generales.profundidadObjetivo,
            level: inputJson.datos_generales.nivel,
            labor: inputJson.datos_generales.labor,
            objective_vein: inputJson.datos_generales.vetaObjetivo,
            platform: inputJson.datos_generales.plataforma,
            zone: inputJson.datos_generales.zona,
            horometer_ini: inputJson.datos_generales.horometroInicial,
            horometer_fin: inputJson.datos_generales.horometroFinal,
            finalized: inputJson.datos_generales.sondajeTerminado,
            date_fin: inputJson.datos_generales.finSondaje
        },
        team_id: inputJson.datos_generales.team_id,
        meters_from: inputJson.avance_perforacion.metrosPerforadosDesde,
        meters_to: inputJson.avance_perforacion.metrosPerforadosHasta,
        surplus_meters: inputJson.avance_perforacion.sobrante,
        constant_meters: inputJson.avance_perforacion.constante,
        M1: inputJson.fluidos.m1,
        M2: inputJson.fluidos.m2,
        M3: inputJson.fluidos.m3,
        M4: inputJson.fluidos.m4,
        PH: inputJson.fluidos.ph,
        PPM: inputJson.fluidos.ppm,
        fluid_return: inputJson.fluidos.retorno,
        dayPartRun: DayPartRun,
        DayPartActivities: DayPartActivities,
        DayPartFluids: DayPartFluids,
        DayPartTest: DayPartTest,
        DayPartProducts: DayPartProducts,
        DayPartPerson: DayPartPerson
    };
    return output;
}
