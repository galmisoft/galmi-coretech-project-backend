import { DayPartService } from '../../services/modules/dayPartService.js'

export class DayPartController {
  static async listDayParts(req, res, next) {
    try {
      const { fecha, equipo, turno, estado } = req.body;
      const listdayParts = await DayPartService.listDayParts(fecha, equipo, turno, estado);
      return res.status(200).json({ listdayParts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async getDayPart(req, res, next){
    try {
      const { dayPartID } = req.body;
      const dayPartData = await DayPartService.getDayPart(dayPartID);
      return res.status(200).json({ dayPartData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createDayParts(req, res, next) {
    try {
      const { data } = req.body;
      const { validacion } = req.files
      const jsonObject = JSON.parse(data);

      const dayParts = await DayPartService.createDayParts(jsonObject, validacion)
      return res.status(200).json({ dayParts });
    } catch (error) { 
      console.log(error)
      return res.status(500).json({ message: 'Internal server error', details: error.message })
    }
  }
}
