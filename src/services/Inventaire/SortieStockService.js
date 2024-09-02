import { PrismaClient } from "@prisma/client";
import { SortieStockReference } from "../../middlewares/Functions.js";
const { equipement, outStock, detaiEquipement } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const { produitList, ...info } = data,
            equipementList = await equipement.findMany({
                where: { deleted: false, id: { in: produitList?.map(x => x?.equipementId) } }
            });

        if (!equipementList?.length)
            throw `Aucun equipement trouvé pour l'approvisionnement...`;

        // Mise à jour de quantité stock
        equipementList?.map(async data => {
            const equip = produitList?.find(x => x?.equipementId === data?.id);
            if (equip) {
                await equipement.update({
                    where: { id: data?.id },
                    data: { qteStock: { decrement: 1 } }
                });
            }
        });

        // Save operation
        const reference = await SortieStockReference();
        return await outStock.create({
            data: {
                ...info,
                reference,
                DetaiEquipement: { createMany: { data: produitList } }
            }
        });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await outStock.count({ where: { deleted: false } }),

            list = await outStock.findMany({
                where: { deleted: false },
                include: {
                    Client: {
                        select: {
                            nomComplet: true,
                            telephone: true,
                            adresse: true
                        }
                    },
                    Marketeur: {
                        select: {
                            nomComplet: true,
                            contact: true
                        }
                    }
                },
                skip: (page - 1) * limit,
                take: limit
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
    // Get all Devices
    getAllDevice: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await detaiEquipement.count({ where: { deleted: false } }),

            list = (await detaiEquipement.findMany({
                where: { deleted: false },
                select: {
                    id: true,
                    imei: true,
                    numeroSim: true,
                    Installed: true,
                    active: true,
                    dateFinAbonnement: true,
                    TypeAbonnement: {
                        select: {
                            forfait: true,
                            validite: true,
                            prix: true
                        }
                    },
                    OutStock: {
                        select: {
                            reference: true,
                            Client: {
                                select: {
                                    nomComplet: true,
                                    telephone: true,
                                    adresse: true
                                }
                            },
                            Marketeur: {
                                select: {
                                    nomComplet: true,
                                    contact: true
                                }
                            }
                        }
                    },
                    Equipement: { select: { libelle: true } },
                    Technicien: { select: { nomComplet: true } }
                },
                orderBy: [{ id: `desc` }],
                skip: (page - 1) * limit,
                take: limit
            }))?.map(data => {
                return {
                    id: true,
                    client: data?.OutStock?.Client,
                    marketeur: data?.OutStock?.Marketeur,
                    typeAbonnement: data?.TypeAbonnement,
                    imei: data?.imei,
                    sim: data?.numeroSim,
                    installed: data?.Installed,
                    active: data?.active,
                    finAbonnement: data?.dateFinAbonnement
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
        return await outStock.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, body) => {
        const { produitList, ...data } = body;
        return await outStock.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await outStock.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await outStock.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await outStock.updateMany({
            data: { deleted: true }
        });
    }
};
