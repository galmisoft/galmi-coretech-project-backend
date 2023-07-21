import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function fillData() {
    const result = await prisma.dayPart.create({
        data: {
            
        }
    })
}