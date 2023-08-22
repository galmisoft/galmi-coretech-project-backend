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

export function transformJson(inputJson, validacion) {
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
        signature: validacion ? validacion[0].buffer : null,
        dayPartRun: DayPartRun,
        DayPartActivities: DayPartActivities,
        DayPartFluids: DayPartFluids,
        DayPartTest: DayPartTest,
        DayPartProducts: DayPartProducts,
        DayPartPerson: DayPartPerson
    };
    return output;
}


export function transformPrisma(dayPartData){

    function obtenerFluidos(DayPartFluids){
        const fluidos = []
        for( const fluid of DayPartFluids ){
            fluidos.push({ id: fluid.id, cantidad: fluid.quantity })
        }
        return fluidos
    }

    function obtenerCorridas(dayPartRun){
        const corridas = []
        for( const run of dayPartRun ){
            corridas.push({
                'id': run.id,
                'desde': run.meters_from,
                'hasta': run.meters_to,
                'longitud': run.length,
                'recuperacion': run.recuperation_percentage,
                'terreno1': run.terrain_type1,
                'terreno2': run.terrain_type2,
                'terreno3': run.terrain_type3,
                'observacion': run.observation,
                'foto': run.picture,
            })
        }
        return corridas
    }

    function obtenerActividades(DayPartActivities){
        const Operativas = []
        const NoOperativas = []
        const Paralizacion = []
        
        for ( const activity of DayPartActivities ) {
            console.log(activity)
            switch(activity.Activities.ActivityType.id){
                case 1:
                    Operativas.push({ id: activity.id, horas: activity.hours })
                    break;
                case 2:
                    NoOperativas.push({ id: activity.id, horas: activity.hours })
                    break;
                case 3:
                    Paralizacion.push({ id: activity.id, horas: activity.hours })
                    break;
                default:
                    break;
            }
        }
        const actividades = { 'Operativas': Operativas, 'NoOperativas': NoOperativas, 'Paralizacion': Paralizacion }
        return actividades
    }

    function obtenerHerramientas(DayPartProducts){
        const Brocas = []
        const Zapata = []
        const RShell = []
        const Tricono = []
        
        for ( const product of DayPartProducts ) {
            console.log(product)
            switch(product.ProductType.id){
                case 1:
                    Brocas.push({
                        "linea": product.line,
                        "nroSerie": product.serial_number,
                        "marca": product.brand,
                        "matriz": product.matrix,
                        "condicionEntrada": product.condition,
                        "cambio": product.drill_bit_change,
                        "condicionSalida": product.end_condition,
                        "desde": product.meters_from,
                        "hasta": product.meters_to,
                        "motivoCambio": product.change_motive,
                        "type_id": product.ProductType.id,
                      })
                    break;
                case 4:
                    Zapata.push({
                        "linea": product.line,
                        "nroSerie": product.serial_number,
                        "marca": product.brand,
                        "matriz": product.matrix,
                        "condicionEntrada": product.condition,
                        "cambio": product.drill_bit_change,
                        "condicionSalida": product.end_condition,
                        "desde": product.meters_from,
                        "hasta": product.meters_to,
                        "motivoCambio": product.change_motive,
                        "type_id": product.ProductType.id,
                      })
                    break;
                case 5:
                    RShell.push({
                        "linea": product.line,
                        "nroSerie": product.serial_number,
                        "marca": product.brand,
                        "matriz": product.matrix,
                        "condicionEntrada": product.condition,
                        "cambio": product.drill_bit_change,
                        "condicionSalida": product.end_condition,
                        "desde": product.meters_from,
                        "hasta": product.meters_to,
                        "motivoCambio": product.change_motive,
                        "type_id": product.ProductType.id,
                      })
                    break;
                case 6:
                    Tricono.push({
                        "linea": product.line,
                        "nroSerie": product.serial_number,
                        "marca": product.brand,
                        "matriz": product.matrix,
                        "condicionEntrada": product.condition,
                        "cambio": product.drill_bit_change,
                        "condicionSalida": product.end_condition,
                        "desde": product.meters_from,
                        "hasta": product.meters_to,
                        "motivoCambio": product.change_motive,
                        "type_id": product.ProductType.id,
                      })
                    break;
                default:
                    break;
            }
        }
        const herramientas = { 'Brocas': Brocas, 'Zapata': Zapata, 'RShell': RShell, 'Tricono': Tricono }
        return herramientas
    }


    function obtenerMedicionesSondaje(DayPartTest){
        const tests = []
        for ( const test of DayPartTest ){
            console.log(test)
            tests.push({
                'id': test.id,
                'profundidad': test.depth,
                'azimut': test.azimut,
                'inclinacion': test.inclination,
                'nombre': test.supervisor_name,
                'empresa': test.company_name,
                'intensidad': test.magnetic_intensity,
                'tiroEfectivo': test.efective,
              })
        }
        return tests
    }

    function obtenerPersonal(dayPartPerson){
        const Persons = {}
        
        var n = 1
        for ( const person of dayPartPerson ) {
            console.log(person)
            let positon = person.Person.Position.name
            if (positon==='Ayudante'){
                positon = `${positon}${n}`
                console.log(positon)
                n = n + 1
            }
            Persons[positon] = { id: person.id, dni: person.Person.dni, name: `${person.Person.complete_name} ${person.Person.lastname1} ${person.Person.lastname2}` }
        }
        return Persons
    }

    const data = {
        "datos_generales": {
                "fechaParteDiario": dayPartData.date,
                "turno": dayPartData.shift,
                "sondaje_id": dayPartData.probe_id,
                "nroSondaje": dayPartData.Probe.probe_number,
                "inicioSondaje": dayPartData.Probe.date_ini,
                "azimut": dayPartData.Probe.azimut_ini,
                "inclinacion": dayPartData.Probe.incline_ini,
                "team_id": dayPartData.team_id,
                "tipoTrabajo": dayPartData.Probe.job_type,
                "profundidadObjetivo": dayPartData.Probe.objective_prof,
                "nivel": dayPartData.Probe.level,
                "labor": dayPartData.Probe.labor,
                "vetaObjetivo": dayPartData.Probe.objective_vein,
                "plataforma": dayPartData.Probe.platform,
                "zona": dayPartData.Probe.zone,
                "horometroInicial": dayPartData.Probe.horometer_ini,
                "horometroFinal": dayPartData.Probe.horometer_fin,
                "sondajeTerminado": dayPartData.Probe.finalized,
                "finSondaje": dayPartData.Probe.date_fin,
            },
            "avance_perforacion": {
                "metrosPerforadosDesde": dayPartData.meters_from,
                "metrosPerforadosHasta": dayPartData.meters_to,
                "sobrante": dayPartData.surplus_meters,
                "constante": dayPartData.constant_meters
            },
            "fluidos": {
                "retorno": dayPartData.fluid_return,
                'm1': dayPartData.M1,
                'm2': dayPartData.M2,
                'm3': dayPartData.M3,
                'm4': dayPartData.M4,
                'ph': dayPartData.PH,
                'ppm': dayPartData.PPM,
                "fluidos": obtenerFluidos(dayPartData.DayPartFluids)
            },
            "corridas": obtenerCorridas(dayPartData.DayPartRun),
            "actividades": obtenerActividades(dayPartData.DayPartActivities),
            "herramientas": obtenerHerramientas(dayPartData.DayPartProducts),
            "medicionesSondaje": obtenerMedicionesSondaje(dayPartData.DayPartTest),
            "personal": obtenerPersonal(dayPartData.DayPartPerson),
            // "firma": dayPartData.signature.data
    }
    return data
}