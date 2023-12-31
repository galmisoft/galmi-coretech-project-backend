export function transformJson(inputJson, files) {
  const DayPartRun = [];
  for (const corrida in inputJson.corridas) {
    DayPartRun.push({
      meters_from: inputJson.corridas[corrida].desde,
      meters_to: inputJson.corridas[corrida].hasta,
      length: inputJson.corridas[corrida].longitud,
      recuperation_percentage: inputJson.corridas[corrida].recuperacion,
      terrain_type1: inputJson.corridas[corrida].terreno1 ?? 0,
      terrain_type2: inputJson.corridas[corrida].terreno2 ?? 0,
      terrain_type3: inputJson.corridas[corrida].terreno3 ?? 0,
      observation: inputJson.corridas[corrida].observacion,
      picture: files.corridaImagenes
        ? files.corridaImagenes[corrida].buffer
        : null,
    });
  }

  const DayPartActivities = [];
  for (const activity in inputJson.actividades) {
    DayPartActivities.push({
      id: inputJson.actividades[activity].id,
      type_id: inputJson.actividades[activity].type_id,
      hours: inputJson.actividades[activity].horas,
    });
  }

  const DayPartFluids = [];
  for (const fluid in inputJson.fluidos.fluidos) {
    DayPartFluids.push({
      id: inputJson.fluidos.fluidos[fluid].id,
      quantity: inputJson.fluidos.fluidos[fluid].cantidad,
    });
  }

  const DayPartTest = [];
  for (const test in inputJson.medicionesSondaje) {
    DayPartTest.push({
      depth: inputJson.medicionesSondaje[test].profundidad,
      azimut: inputJson.medicionesSondaje[test].azimut,
      inclination: inputJson.medicionesSondaje[test].inclinacion,
      supervisor_name: inputJson.medicionesSondaje[test].nombre,
      company_name: inputJson.medicionesSondaje[test].empresa,
      magnetic_intensity: inputJson.medicionesSondaje[test].intensidad,
      efective: inputJson.medicionesSondaje[test].tiroEfectivo === "si",
    });
  }

  const DayPartProducts = [];
  for (const product in inputJson.herramientas) {
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
      change_motive: inputJson.herramientas[product].motivoCambio,
    });
  }

  const DayPartPerson = [];
  for (const person in inputJson.personal) {
    DayPartPerson.push({
      person_id: inputJson.personal[person].id,
    });
  }

  const output = {
    date: inputJson.datos_generales.fechaParteDiario,
    shift: inputJson.datos_generales.turno,
    status: inputJson.datos_generales.sondajeTerminado === true ? 1 : 0,
    probe_id: inputJson.datos_generales.sondaje_id
      ? inputJson.datos_generales.sondaje_id
      : null,
    user_id: inputJson.datos_generales.userId,
    probe: {
      company_id: inputJson.datos_generales.companyId,
      project_id: inputJson.datos_generales.projectId,
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
      date_fin: inputJson.datos_generales.finSondaje,
    },
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
    signature: files.validacion ? files.validacion[0].buffer : null,
    dayPartRun: DayPartRun,
    DayPartActivities: DayPartActivities,
    DayPartFluids: DayPartFluids,
    DayPartTest: DayPartTest,
    DayPartProducts: DayPartProducts,
    DayPartPerson: DayPartPerson,
  };
  return output;
}

export function transformPrisma(dayPartData) {
  function obtenerFluidos(DayPartFluids) {
    const fluidos = [];
    for (const fluid of DayPartFluids) {
      fluidos.push({
        id: fluid.id,
        descripcion: fluid.Product.name,
        cantidad: fluid.quantity,
      });
    }
    return fluidos;
  }

  function obtenerCorridas(dayPartRun) {
    const corridas = [];
    for (const run of dayPartRun) {
      corridas.push({
        id: run.Run.id,
        desde: run.Run.meters_from,
        hasta: run.Run.meters_to,
        longitud: run.Run.length,
        recuperacion: run.Run.recuperation_percentage,
        terreno1: run.Run.terrain_type1,
        terreno2: run.Run.terrain_type2,
        terreno3: run.Run.terrain_type3,
        observacion: run.Run.observation,
        foto: run.Run.picture,
      });
    }
    return corridas;
  }

  function obtenerActividades(DayPartActivities) {
    const Operativas = [];
    const NoOperativas = [];
    const Paralizacion = [];

    for (const activity of DayPartActivities) {
      switch (activity.Activities.ActivityType.id) {
        case 1:
          Operativas.push({
            id: activity.id,
            descripcion: activity.Activities.name,
            horas: activity.hours,
          });
          break;
        case 2:
          NoOperativas.push({
            id: activity.id,
            descripcion: activity.Activities.name,
            horas: activity.hours,
          });
          break;
        case 3:
          Paralizacion.push({
            id: activity.id,
            descripcion: activity.Activities.name,
            horas: activity.hours,
          });
          break;
        default:
          break;
      }
    }
    const actividades = {
      operativas: Operativas,
      noOperativas: NoOperativas,
      paralizacion: Paralizacion,
    };
    return actividades;
  }

  function obtenerHerramientas(DayPartProducts) {
    const Brocas = [];
    const Zapata = [];
    const RShell = [];
    const Tricono = [];

    for (const product of DayPartProducts) {
      switch (product.ProductType.id) {
        case 1:
          Brocas.push({
            linea: product.line,
            nroSerie: product.serial_number,
            marca: product.brand,
            matriz: product.matrix,
            condicionEntrada: product.condition,
            cambio: product.drill_bit_change,
            condicionSalida: product.end_condition,
            desde: product.meters_from,
            hasta: product.meters_to,
            motivoCambio: product.change_motive,
            type_id: product.ProductType.id,
          });
          break;
        case 4:
          Zapata.push({
            linea: product.line,
            nroSerie: product.serial_number,
            marca: product.brand,
            matriz: product.matrix,
            condicionEntrada: product.condition,
            cambio: product.drill_bit_change,
            condicionSalida: product.end_condition,
            desde: product.meters_from,
            hasta: product.meters_to,
            motivoCambio: product.change_motive,
            type_id: product.ProductType.id,
          });
          break;
        case 5:
          RShell.push({
            linea: product.line,
            nroSerie: product.serial_number,
            marca: product.brand,
            matriz: product.matrix,
            condicionEntrada: product.condition,
            cambio: product.drill_bit_change,
            condicionSalida: product.end_condition,
            desde: product.meters_from,
            hasta: product.meters_to,
            motivoCambio: product.change_motive,
            type_id: product.ProductType.id,
          });
          break;
        case 6:
          Tricono.push({
            linea: product.line,
            nroSerie: product.serial_number,
            marca: product.brand,
            matriz: product.matrix,
            condicionEntrada: product.condition,
            cambio: product.drill_bit_change,
            condicionSalida: product.end_condition,
            desde: product.meters_from,
            hasta: product.meters_to,
            motivoCambio: product.change_motive,
            type_id: product.ProductType.id,
          });
          break;
        default:
          break;
      }
    }
    const herramientas = {
      broca: Brocas,
      zapata: Zapata,
      rShell: RShell,
      tricono: Tricono,
    };
    return herramientas;
  }

  function obtenerMedicionesSondaje(DayPartTest) {
    const tests = [];
    for (const test of DayPartTest) {
      tests.push({
        id: test.id,
        profundidad: test.depth,
        azimut: test.azimut,
        inclinacion: test.inclination,
        nombre: test.supervisor_name,
        empresa: test.company_name,
        intensidad: test.magnetic_intensity,
        tiroEfectivo: test.efective,
      });
    }
    return tests;
  }

  function obtenerPersonal(dayPartPerson) {
    const Persons = {};

    var n = 1;
    for (const person of dayPartPerson) {
      let positon = person.Person.Position.name.toLowerCase();
      if (positon === "ayudante") {
        positon = `${positon}${n}`;
        n = n + 1;
      }
      Persons[positon] = {
        id: person.id,
        dni: person.Person.dni,
        nombre: `${person.Person.complete_name} ${person.Person.lastname1} ${person.Person.lastname2}`,
      };
    }
    return Persons;
  }

  const data = {
    datos_generales: {
      fechaParteDiario: dayPartData.date,
      turno: dayPartData.shift,
      sondaje_id: dayPartData.probe_id,
      nroSondaje: dayPartData.Probe.probe_number,
      inicioSondaje: dayPartData.Probe.date_ini,
      azimut: dayPartData.Probe.azimut_ini,
      inclinacion: dayPartData.Probe.incline_ini,
      tipoTrabajo: dayPartData.Probe.job_type,
      profundidadObjetivo: dayPartData.Probe.objective_prof,
      nivel: dayPartData.Probe.level,
      labor: dayPartData.Probe.labor,
      vetaObjetivo: dayPartData.Probe.objective_vein,
      plataforma: dayPartData.Probe.platform,
      zona: dayPartData.Probe.zone,
      horometroInicial: dayPartData.Probe.horometer_ini,
      horometroFinal: dayPartData.Probe.horometer_fin,
      sondajeTerminado: dayPartData.Probe.finalized,
      finSondaje: dayPartData.Probe.date_fin,
    },
    proyecto: {
      name: dayPartData.Probe.Project.name,
      id: dayPartData.Probe.Project.id,
    },
    cliente: {
      name: dayPartData.User.Assignation[0].Client.name,
      id: dayPartData.User.Assignation[0].Client.id,
      comercial_name: dayPartData.User.Assignation[0].Client.comercial_name,
    },
    equipo: {
      id: dayPartData.User.Assignation[0].Equipment.id,
      internal_code: dayPartData.User.Assignation[0].Equipment.internal_code,
      mine_code: dayPartData.User.Assignation[0].Equipment.mine_code,
    },
    avance_perforacion: {
      metrosPerforadosDesde: dayPartData.meters_from,
      metrosPerforadosHasta: dayPartData.meters_to,
      sobrante: dayPartData.surplus_meters,
      constante: dayPartData.constant_meters,
    },
    fluidos: {
      retorno: dayPartData.fluid_return,
      m1: dayPartData.M1,
      m2: dayPartData.M2,
      m3: dayPartData.M3,
      m4: dayPartData.M4,
      ph: dayPartData.PH,
      ppm: dayPartData.PPM,
      fluidos: obtenerFluidos(dayPartData.DayPartFluids),
    },
    corridas: obtenerCorridas(dayPartData.DayPartRun),
    actividades: obtenerActividades(dayPartData.DayPartActivities),
    herramientas: obtenerHerramientas(dayPartData.DayPartProducts),
    medicionesSondaje: obtenerMedicionesSondaje(dayPartData.DayPartTest),
    personal: obtenerPersonal(dayPartData.DayPartPerson),
    firma: dayPartData.signature,
  };
  return data;
}
