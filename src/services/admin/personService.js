import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class PersonsService { 
  static async listPersons(companyId, PersonName) {
    try {
      const Person = await prisma.Person.findMany({
        where: {
          name: { contains: PersonName === undefined ? "" : PersonName },
          company_id: { contains: companyId === undefined ? "" : companyId }
        },
        include: {
          DniType: {
            select: {
              id: true,
              name: true
            }
          },
          Position: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return Person;
    } catch (error) {
      console.error('Error fetching Person:', error);
      throw new Error('Failed to listPersons');
    }
  }
  static async createPerson(PersonModel) {
    try {
      const newPerson = await prisma.Person.create({
        data: {
          name: PersonModel.name,
          lastname1: PersonModel.lastname1,
          lastname2: PersonModel.lastname2,
          dni_type: PersonModel.dni_type,
          dni: PersonModel.dni,
          position_id: PersonModel.position_id,
          picture: PersonModel.picture,
          active: PersonModel.active,
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
  static async updatePerson(PersonModel) {
    try {
      const updatedPerson = await prisma.Person.update({
        where: {
          id: PersonModel.id,
        },
        data: {
            name: PersonModel.name,
            lastname1: PersonModel.lastname1,
            lastname2: PersonModel.lastname2,
            dni_type: PersonModel.dni_type,
            dni: PersonModel.dni,
            position_id: PersonModel.position_id,
            picture: PersonModel.picture,
            active: PersonModel.active,
            created_At: new Date(),
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
