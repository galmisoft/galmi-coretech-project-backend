import { EmailService } from '../../services/admin/emailService.js';

export class EmailController {
  static async listEmail(req, res, next) {
    try {
      const { companyID } = req.body;
      const Emails = await EmailService.listEmails(companyID);
      return res.status(200).json({ Emails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async createEmail(req, res, next) {
    try {
      const EmailModel = req.body;
      const Emails = await EmailService.createEmail(EmailModel);
      return res.status(200).json({ Emails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async updateEmail(req, res, next) {
    try {
      const EmailModel = req.body;
      const Emails = await EmailService.updateEmail(EmailModel);
      return res.status(200).json({ Emails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
  static async deleteEmail(req, res, next) {
    try {
      const { id } = req.body;
      const Emails = await EmailService.deleteEmail(id);
      return res.status(200).json({ Emails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  }
}