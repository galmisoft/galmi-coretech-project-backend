import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

async function getCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name')
        const countries = response.data.map(element => element.name.common);
        console.log(countries.length)
        return countries;
    } catch (error) {
        console.log('Error fetching countries:', error);
        return [];
    }
}

async function fillData() {
    // Data
    const countriesList = await getCountries(); 
    try {
        // Filling
        
        const existingColumnValues = await prisma.country.findMany({
            select: {
              name: true,
            },
          });
        const existingValuesSet = new Set(existingColumnValues.map((item) => item.name));
        const uniqueDataArray = countriesList.filter((item) => !existingValuesSet.has(item.name));
        const countries1 = await Promise.all(
            uniqueDataArray.map((name) => prisma.country.create({ data: { name } }))
        );


    } catch (error) {
        console.error('Error adding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fillData()
