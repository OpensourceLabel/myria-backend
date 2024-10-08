import { PrismaClient } from "@prisma/client";
import { EtablissementReference } from "../src/middlewares/Functions.js";
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
    const devise = await prisma.devise.findFirst({
        where: { deleted: false }
    });

    if (!devise) {
        const reference = await EtablissementReference();
        await prisma.devise.create({
            data: {
                ...InfoApp?.DefaulDevise,
                Etablissement: {
                    create: {
                        ...InfoApp?.DefaultEtablissement,
                        reference: reference,
                        User: { create: { ...InfoApp?.AdminSys } },
                        Exemple: { createMany: { data: InfoApp?.Exemple } }
                    }
                }
            }
        });
        console.log(`Informations par defaut générées avec succès...`);
    }
};