import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class PersonsService {
  static async listPersons(defaultCompanyID, companyID) {
    try {
      const Person = await prisma.Person.findMany({
        where: {
          OR: [
            { company_id: companyID },
            { company_id: defaultCompanyID },
          ],
        },
        include: {
          DniType: {
            select: {
              id: true,
              name: true,
            },
          },
          Position: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return Person;
    } catch (error) {
      console.error('Error fetching Person:', error);
      throw new Error('Failed to listPersons');
    }
  }
  static async createPerson(PersonModel, picture) {
    try {
      const newPerson = await prisma.Person.create({
        data: {
          complete_name: PersonModel.name,
          lastname1: PersonModel.lastname1,
          lastname2: PersonModel.lastname2,
          dni_type: Number(PersonModel.dni_type),
          dni: PersonModel.dni,
          position_id: Number(PersonModel.position_id),
          picture: Buffer.from(picture[0].filename),
          active: Boolean(PersonModel.active),
          company_id: PersonModel.company_id,
          created_At: new Date(),
          updated_At: new Date(),
        },
      });
      return newPerson;
    } catch (error) {
      console.error('Error creating Person:', error);
      throw new Error('Failed to createPerson');
    }
  }
  static async updatePerson(PersonModel, picture) {
    try {
      const updatedPerson = await prisma.Person.update({
        where: {
          id: PersonModel.id,
        },
        data: {
          complete_name: PersonModel.name,
          lastname1: PersonModel.lastname1,
          lastname2: PersonModel.lastname2,
          dni_type: Number(PersonModel.dni_type),
          dni: PersonModel.dni,
          position_id: Number(PersonModel.position_id),
          picture: Buffer.from(picture[0].filename),
          active: Boolean(PersonModel.active),
          updated_At: new Date(),
        },
      });
      return updatedPerson;
    } catch (error) {
      console.error('Error updating Person:', error);
      throw new Error('Failed to updatePerson');
    }
  }

  static async deletePerson(PersonId) {
    try {
      const deletedPerson = await prisma.Person.delete({ where: { id: PersonId } });
      return deletedPerson;
    } catch (error) {
      console.error('Error deleting Person:', error);
      throw new Error('Failed to deletePerson');
    }
  }

  static async toggleAvailable(PersonId) {
    try {
      const Person = await prisma.Person.findUnique({
        where: { id: PersonId }
      });

      const toggle = await prisma.Person.update({
        where: { id: PersonId }, data: { active: !Person.active },
      });
      return toggle;
    } catch (error) {
      console.error('Error toggling Person availability:', error);
      throw new Error('An error occurred while toggling Person availability');
    }
  }
}
