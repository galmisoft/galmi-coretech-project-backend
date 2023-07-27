import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ActivityService {
  static async listActivies(activityName) {
    try {
        const listActivites = await prisma.Activities.findMany({
        where: { name: { contains: activityName === undefined ? "true" : activityName } },
        include: { ActivityType: { select: { id: true, name: true } } }
      });
      return listActivites;
    } catch (error) {
      throw new Error('Failed to listActivies');
    }
  }
  static async createActivity(activityModel) {
    try {
      const activity = await prisma.activities.create({
        data: {
          name: activityModel.name,
          type: activityModel.type,
          active: activityModel.active,
          created_At: new Date(),
          updated_At: new Date()
        }
      });
      return activity;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error('An error occurred while creating the activity')
    }
  }

  static async updateActivity(activityModel) {
    try {
      const activity = await prisma.activities.update({
        where: { id: activityModel.id },
        data: {
          name: activityModel.name,
          type: activityModel.type,
          active: activityModel.active,
          updated_At: new Date()
        }
      });
      return activity;
    } catch (error) {
      console.error('Error updating activity:', error);
      throw new Error('An error occurred while updating the activity');
    }
  }
  static async deleteActivity(activityID) {
    try {
      const activity = await prisma.activities.delete({ where: { id: activityID } });
      return activity;
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw new Error('An error occurred while deleting the activity');
    }
  }
  static async toggleAvailable(activityID) {
    try {
      const activity = await prisma.ActiviesdayPart.findUnique({
        where: { id: activityID }
      });

      const toggle = await prisma.ActiviesdayPart.update({
        where: { id: activityID }, data: { active: !activity.active },
      });
      return toggle;
    } catch (error) {
      console.error('Error toggling activity availability:', error);
      throw new Error('An error occurred while toggling activity availability');
    }
  }
  
  
}
