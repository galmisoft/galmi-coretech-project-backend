import { DayPartService } from '../services/dayPartService.js';

export class DayPartController {
  static async listDayParts(req, res, next) {
    try {
      const { fecha, equipo, turno, estado } = req.query;
      const listdayParts = await DayPartService.listDayParts({ fecha, equipo, turno, estado });
      return res.status(200).json({ listdayParts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async dayPartData(req, res, next){
    try {
      const dayPartData = await DayPartService.dayPartData();
      return res.status(200).json({ dayPartData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async createDayParts(req, res, next) {
    try {
      const { dayPartsModel } = req.query;
      const dayParts = await DayPartService.createDayParts(dayPartsModel)
      return res.status(200).json({ dayParts });
    } catch (err) { 
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
