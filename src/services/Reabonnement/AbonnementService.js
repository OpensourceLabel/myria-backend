import { PrismaClient } from "@prisma/client";
import { AbonnementReference, CalculerDateFinAbonnement } from "../../middlewares/Functions.js";
const { reabonnement, detaiEquipement } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const device = await detaiEquipement.findUnique({
            where: { id: data?.deviceId },
            include: { TypeAbonnement: true }
        });

        if (!device) throw `ID d'équipement invalide...`;

        const reference = await AbonnementReference(),
            dateFinAbonnement = CalculerDateFinAbonnement(device?.TypeAbonnement?.validite);

        // save abonnement 
        return await detaiEquipement.update({
            where: { id: device?.id },
            data: {
                dateFinAbonnement: dateFinAbonnement,
                Reabonnement: {
                    create: {
                        reference: reference,
                        typeAbonnementId: device?.typeAbonnementId,
                        validite: device?.TypeAbonnement?.validite,
                        prix: device?.TypeAbonnement?.prix,
                        montantPaye: device?.TypeAbonnement?.prix,
                        dateFinAbonnement: dateFinAbonnement
                    }
                }
            }
        });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await reabonnement.count({ where: { deleted: false } }),

            list = (await reabonnement.findMany({
                where: { deleted: false },
                include: {
                    DetaiEquipement: {
                        select: {
                            imei: true,
                            numeroSim: true,
                            dateFinAbonnement: true,
                            OutStock: {
                                select: {
                                    Client: {
                                        select: { nomComplet: true, adresse: true }
                                    }
                                }
                            }
                        }
                    },
                    TypeAbonnement: {
                        select: {
                            forfait: true,
                            validite: true,
                            prix: true
                        }
                    }
                },
                skip: (page - 1) * limit,
                take: limit
            }))?.map(data => {
                return {
                    id: true,
                    client: data?.DetaiEquipement?.OutStock?.Client,
                    reference: data?.reference,
                    imei: data?.DetaiEquipement?.imei,
                    numeroSim: data?.DetaiEquipement?.numeroSim,
                    montant: data?.montantPaye,
                    validite: data?.validite,
                    dateAbonnement: data?.dateAbonnement,
                    dateFinAbonnement: data?.dateFinAbonnement,
                }
            })

        return {
            pagination: {
                page,
                limit,
                totalPage: Math.ceil(totalAccount / limit)
            },
            list
        }
    },
    // GetById
    getByID: async (id) => {
        return await reabonnement.findUnique({
            where: { id }
        });
    },
    // // Update
    // update: async (id, data) => {
    //     return await reabonnement.update({
    //         where: { id }, data
    //     });
    // },
    // Delete
    delete: async (id) => {
        return await reabonnement.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await reabonnement.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await reabonnement.updateMany({
            data: { deleted: true }
        });
    }
};
