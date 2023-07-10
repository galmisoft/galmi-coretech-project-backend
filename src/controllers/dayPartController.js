import { DayPartService } from '../services/dayPartService.js';

export class DayPartController {
  static async getDayParts(req, res, next) {
    try {
      const { fecha, equipo, turno, estado } = req.query;
      const dayParts = await DayPartService.listDayParts({ fecha, equipo, turno, estado });
      return res.status(200).json({ dayParts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
