import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

async function getCountries() {
    try {
        const countries = [
          "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita",
          "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés",
          "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania (Myanmar)", "Bolivia",
          "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután",
          "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano",
          "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba",
          "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia",
          "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón",
          "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", "Guyana",
          "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón",
          "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto",
          "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia del Norte", "Madagascar", "Malasia",
          "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco",
          "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda",
          "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido",
          "República Centroafricana", "República Checa", "República del Congo", "República Democrática del Congo", "República Dominicana",
          "Ruanda", "Rumania", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía",
          "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia",
          "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo",
          "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu",
          "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
        ];
        console.log(countries.length)
        return countries;
    } catch (error) {
        console.log('Error fetching countries:', error);
        return [];
    }
}
async function getTerrainTypes() {
  const terrainTypes = [
    "Montaña", "Colina", "Valle", "Bosque", "Selva", "Desierto", "Playa", "Llanura", 
    "Pantano", "Tundra", "Acantilado", "Cueva", "Volcán", "Océano", "Río", "Lago", 
    "Glaciar", "Duna", "Cañón", "Delta", "Meseta", "Llanura aluvial", "Ciénaga", "Arrecife"
  ];
  
  console.log(terrainTypes.length);
  return terrainTypes;
}
async function getMeassures() {
  const Meassures = [
    "1 cm", "2 cm", "3 cm", "4 cm", "5 cm", "10 cm", "15 cm", "20 cm", "25 cm", "30 cm",
    "35 cm", "40 cm", "45 cm", "50 cm", "55 cm", "60 cm", "65 cm", "70 cm", "75 cm",
    "80 cm", "85 cm", "90 cm", "95 cm", "100 cm",
    "250 ml", "500 ml", "750 ml", "1 litro", "1.25 litros", "1.5 litros", "1.75 litros",
    "2 litros", "2.25 litros", "2.5 litros", "2.75 litros", "3 litros", "3.25 litros",
    "3.5 litros", "3.75 litros", "4 litros", "4.25 litros", "4.5 litros", "4.75 litros",
    "5 litros"
  ];
  console.log(Meassures.length);
  return Meassures;
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
      console.log(`Inserted country: ${countryName}`);
    }
  } catch (error) {
    console.error('Error inserting countries:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertTerrainTypes(terrainTypes) {
  const prisma = new PrismaClient();
  try {
    for (const t of terrainTypes) {
      const terrain = await prisma.terrainType.create({
        data: {
          terrain_name: t,
        },
      });
      console.log(`Inserted terrain: ${t}`);
    }
  } catch (error) {
    console.error('Error inserting terrains:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertMeassures(meassures) {
  const prisma = new PrismaClient();
  try {
    for (const m of meassures) {
      const meassure = await prisma.meassure.create({
        data: {
          name: m,
        },
      });
      console.log(`Inserted meassures: ${m}`);
    }
  } catch (error) {
    console.error('Error inserting meassures:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function fillData() {
    // Data
    // const countriesList = await getCountries();
    // insertCountries(countriesList)

    // const terrainTypes = await getTerrainTypes()
    // insertTerrainTypes(terrainTypes)

    // const Meassures = await getMeassures()
    // insertMeassures(Meassures)
}

fillData()
