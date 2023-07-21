import { ActivityService } from '../services/activityService.js';

export class ActivityController {
  static async listActivies(req, res, next) {
    try {
      const { activityName } = req.query;
      const activities = await ActivityService.listActivies(activityName);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async createActivities(req, res, next) {
    try {
      const { activityModel } = req.query;
      const activities = await ActivityService.createActivity(activityModel);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async updateActivities(req, res, next) {
    try {
      const { activityModel } = req.query;
      const activities = await ActivityService.updateActivity(activityModel);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async deleteActivities(req, res, next) {
    try {
      const { activityID } = req.query;
      const activities = await ActivityService.deleteActivity(activityID);
      return res.status(200).json({ activities });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  static async toggleActive(req, res, next) {
    try {
      const { activityID } = req.query;
      const toggle = await ActivityService.toggleAvailable(activityID);
      return res.status(200).json({ toggle });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
