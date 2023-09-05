
export function transformMetrosPerforados (result) {
    const metroPerforadosMapped = result.reduce((acc, item) => {
        const {
            date_ini,
            date_fin,
            DayPart: {
            DayPartRun: {
                Run: { meters_from, meters_to, terrain_type1, terrain_type2, terrain_type3 },
            },
            DayPartActivities: { Activities },
            },
        } = item;

        const date1 = new Date(date_ini)
        const date2 = new Date(date_fin)
        const daysDifference = (date2 - date1) / (1000 * 60 * 60 * 24);

        const promedioDiario = (meters_to - meters_from) / daysDifference;
        const pozosPerforados = [terrain_type1, terrain_type2, terrain_type3].filter(type => type === 10).length;
        const operativasHours = Activities.filter(activity => activity.type_id === 'operativas').reduce((total, activity) => total + activity.hours, 0);
        const noOperativasHours = Activities.filter(activity => activity.type_id === 'noOperativas').reduce((total, activity) => total + activity.hours, 0);
        const paralizacionHours = Activities.filter(activity => activity.type_id === 'paralizacion').reduce((total, activity) => total + activity.hours, 0);
        const totalHours = noOperativasHours + paralizacionHours;
        const ratioCumplimiento = (operativasHours / (totalHours > 0 ? totalHours : 1)) * 100;

        const mappedItem = {
            acumulado: {
            promedioDiario,
            pozosPerforados,
            totalHoras: totalHours,
            horas: {
                operativas: operativasHours,
                NoOperativas: noOperativasHours,
                Paralizacion: paralizacionHours,
            },
            ratioCumplimiento,
            },
            mensual: {
            promedioDiario,
            pozosPerforados,
            totalHoras: totalHours,
            horas: {
                operativas: operativasHours,
                NoOperativas: noOperativasHours,
                Paralizacion: paralizacionHours,
            },
            ratioCumplimiento,
            },
        };
        acc.push(mappedItem);

        return acc;
    }, []);
    return metroPerforadosMapped
}