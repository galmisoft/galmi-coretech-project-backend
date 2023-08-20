export default function transformJson(inputJson) {
    const output = {
        date: inputJson.datos_generales.fechaParteDiario,
        shift: inputJson.datos_generales.turno === 'dia' ? 1 : 2,
        status: inputJson.datos_generales.sondajeTerminado === 'si' ? 1 : 2,
        probe_id: inputJson.datos_generales.probe_id ? inputJson.datos_generales.probe_id : null,
        probe: {
            probe_number: inputJson.datos_generales.nroSondaje,
            date_ini: inputJson.datos_generales.inicioFechaSondaje,
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
        dayPartRun: inputJson.corridas.map(corrida => ({
            meters_from: corrida.desde,
            meters_to: corrida.hasta,
            length: corrida.longitud,
            recuperation_percentage: corrida.recuperacion,
            terrain_type1: corrida.terreno1,
            terrain_type2: corrida.terreno2,
            terrain_type3: corrida.terreno3,
            observation: corrida.observacion,
            picture: corrida.foto
        })),
        DayPartActivities: inputJson.actividades.operativas
            .filter(activity => activity.horas !== null)
            .map(activity => ({ id: activity.descripcion, hours: activity.horas })),
        DayPartFluids: inputJson.fluidos.fluidos.map(fluid => ({
            id: fluid.descripcion,
            quantity: fluid.cantidad
        })),
        DayPartTest: inputJson.medicionesSondaje.map(test => ({
            depth: test.profundidad,
            azimut: test.azimut,
            inclination: test.inclinacion,
            supervisor_name: test.nombre,
            company_name: test.empresa,
            magnetic_intensity: test.intensidad,
            efective: test.tiroEfectivo === 'si'
        })),
        DayPartProducts: [
            ...inputJson.herramientas.broca.map(product => ({
                line: product.linea,
                type_id: 1,
                serial_number: product.nroSerie,
                brand: product.marca,
                matrix: product.matriz,
                condition: product.condicionEntrada,
                meters_from: product.desde,
                drill_bit_change: product.cambio,
                end_condition: product.condicionSalida,
                meters_to: product.hasta,
                change_motive: product.motivoCambio
            })),
            ...inputJson.herramientas.rShell.map(product => ({
                line: product.linea,
                type_id: 2,
                serial_number: product.nroSerie,
                brand: product.marca,
                matrix: product.matriz,
                condition: product.condicionEntrada,
                meters_from: product.desde,
                drill_bit_change: product.cambio,
                end_condition: product.condicionSalida,
                meters_to: product.hasta,
                change_motive: product.motivoCambio
            }))
        ],
        DayPartPerson: Object.values(inputJson.personal)
            .map(person_data => ({
                complete_name: person_data.nombre,
                lastname1: person_data.nombre.split(' ')[0],
                lastname2: person_data.nombre.split(' ')[1],
                dni_type: 1, // Replace with actual DNI type
                dni: person_data.dni,
                position_id: 1, // Replace with actual position ID
                picture: null,
                active: true,
                company_id: person_data.id
            }))
    };
    return output;
}
