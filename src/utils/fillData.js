import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

async function getCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=translations')
        const countries = response.data.map(element => element.translations.spa.common);
        console.log(countries.length)
        return countries;
    } catch (error) {
        console.log('Error fetching countries:', error);
        return [];
    }
}
async function insertCountries(countries) {
    const prisma = new PrismaClient();
    try {
      for (const countryName of countries) {
        const country = await prisma.country.create({
          data: {
            name: countryName,
          },
        });
        console.log(`Inserted country: ${country.name}`);
      }
    } catch (error) {
      console.error('Error inserting countries:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

async function fillData() {
    // Data
    const countriesList = await getCountries(); 
    insertCountries(countriesList)
}

fillData()
