import { PrismaClient } from "@prisma/client";
import InfoApp from "./DataConfig/InfoApp.js";
const prisma = new PrismaClient();

// Function check API
export const CheckApi = async () => {
    try {
        await prisma?.$connect();
        console.log(`Connexion à la BDD établie...`);
        await GenerateSysAdmin();
    } catch (error) {
        console.error(error);
    }
}

// Function system
async function GenerateInfoSystem() {

}

// Generate super admin
async function GenerateSysAdmin() {
    const user = await prisma.user.findFirst({
        where: { deleted: false }
    });

    if (!user) {
        await prisma.user.create({
            data: InfoApp?.AdminSys
        });
        console.log(`Admin system généré avec succès`);
    }
}