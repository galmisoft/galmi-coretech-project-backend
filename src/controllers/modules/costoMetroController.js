import { CostoMetroService } from '../../services/modules/costoMetroService.js'

export class CostoMetroController {
  static async listCostoMetro(req, res, next) {
    try {
      const { jobType, dateIni, dateFin, probeId, teamName } = req.query;
      const tools = await CostoMetroService.listCostoMetro({ jobType, dateIni, dateFin, probeId, teamName });
      return res.status(200).json({ tools });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async downloadCostoMetro(req, res, next) {
    try {
      const { jobType, dateIni, dateFin, probeId, teamName } = req.query;
      const tools = await CostoMetroService.listCostoMetro({ jobType, dateIni, dateFin, probeId, teamName });
      // Pasar de lista a archivo descargable
      return res.status(200).json({ tools });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
