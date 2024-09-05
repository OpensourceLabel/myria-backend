import { PrismaClient } from "@prisma/client";
import { EntrepriseReference } from "../src/middlewares/Functions.js";
import InfoApp from "./DataConfig/InfoApp.js";

const prisma = new PrismaClient();

// Function check API
export const CheckApi = async () => {
    try {
        await prisma?.$connect();
        console.log(`Connexion à la BDD établie...`);
        await GenerateDefaultInfos();
    } catch (error) {
        console.error(error);
    }
};

// Generate super admin
async function GenerateDefaultInfos() {
    const entreprise = await prisma.entreprise.findFirst({
        where: { deleted: false }
    });

    if (!entreprise) {
        const reference = await EntrepriseReference();
        await prisma.Entreprise.create({
            data: {
                ...InfoApp?.DefaultEntreprise,
                reference: reference,
                User: { create: { ...InfoApp?.AdminSys } }
            }
        });
        console.log(`Entreprise par defaut générée avec succès...`);
    }
};