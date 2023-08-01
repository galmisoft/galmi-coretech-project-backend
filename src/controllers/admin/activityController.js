import { ActivityService } from '../../services/admin/activityService.js';

export class ActivityController {
  static async listActivies(req, res, next) {
    try {
      const { activityName } = req.body;
      const activities = await ActivityService.listActivies(activityName);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createActivities(req, res, next) {
    try {
      const activityModel = req.body;
      const activities = await ActivityService.createActivity(activityModel);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateActivities(req, res, next) {
    try {
      const activityModel = req.body;
      const activities = await ActivityService.updateActivity(activityModel);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteActivities(req, res, next) {
    try {
      const { id } = req.body;
      const activities = await ActivityService.deleteActivity(id);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async toggleActive(req, res, next) {
    try {
      const { id } = req.body;
      const toggle = await ActivityService.toggleAvailable(id);
      return res.status(200).json({ toggle });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}
