import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class EmailsService { 
  static async listEmails(companyId, mailTo) {
    try {
      const Email = await prisma.email.findMany({
        where: {
          mail_to: { contains: mailTo === undefined ? "" : mailTo },
          company_id: { contains: companyId === undefined ? "" : companyId }
        },
      });
      return Email;
    } catch (error) {
      console.error('Error fetching Email:', error);
      throw new Error('Failed to listEmails');
    }
  }
  static async createEmail(EmailModel) {
    try {
      const newEmail = await prisma.email.create({
        data: {
            mail_type: EmailModel.mail_type,
            mail_to: EmailModel.mail_to,
            CC: EmailModel.CC,
            CCO: EmailModel.CCO,
            active: EmailModel.active,
            created_At: new Date(),
            updated_At: new Date(),
        },
      });
      return newEmail;
    } catch (error) {
      console.error('Error creating Email:', error);
      throw new Error('Failed to createEmail');
    }
  }  
  static async updateEmail(data) {
    try {
      const updatedEmail = await prisma.email.update({
        where: {
          id: EmailModel.id,
        },
        data: {
            mail_type: EmailModel.mail_type,
            mail_to: EmailModel.mail_to,
            CC: EmailModel.CC,
            CCO: EmailModel.CCO,
            active: EmailModel.active,
            created_At: new Date(),
            updated_At: new Date(),
        },
      });
      return updatedEmail;
    } catch (error) {
      console.error('Error updating Email:', error);
      throw new Error('Failed to updateEmail');
    }
  }
  
  static async deleteEmail(EmailId) {
    try {
      const deletedEmail = await prisma.email.delete({ where: { id: EmailId } });
      return deletedEmail;
    } catch (error) {
      console.error('Error deleting Email:', error);
      throw new Error('Failed to deleteEmail');
    }
  }

  static async toggleAvailable(EmailId) {
    try {
      const Email = await prisma.email.findUnique({
        where: { id: EmailId }
      });

      const toggle = await prisma.email.update({
        where: { id: EmailId }, data: { active: !Email.active },
      });
      return toggle;
    } catch (error) {
      console.error('Error toggling Email availability:', error);
      throw new Error('An error occurred while toggling Email availability');
    }
  }
}
