import { ProbeService } from '../../services/admin/probeService.js';

export class ProbeController {
  static async findProbe(req, res, next) {
    try {
      const { probeID } = req.body;
      const probe = await ProbeService.findProbe(probeID);
      return res.status(200).json({ probe });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}
