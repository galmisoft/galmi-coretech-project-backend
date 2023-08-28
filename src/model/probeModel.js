export function transformPrisma(probeData) {
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

  const data = {
    nroSondaje: probeData.probe_number,
    inicioSondaje: probeData.date_ini,
    azimut: probeData.azimut_ini,
    inclinacion: probeData.incline_ini,
    tipoTrabajo: probeData.job_type,
    profundidadObjetivo: probeData.objective_prof,
    nivel: probeData.level,
    labor: probeData.labor,
    vetaObjetivo: probeData.objective_vein,
    plataforma: probeData.platform,
    zona: probeData.zone,
    metrosPerforadosDesde: probeData.DayPart[0].meters_to,
    constante: probeData.DayPart[0].constant_meters,
    herramientas: obtenerHerramientas(probeData.DayPart[0].DayPartProducts),
  };
  return data;
}
