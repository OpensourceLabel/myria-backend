import { PrismaClient } from "@prisma/client";
const { detaiEquipement } = new PrismaClient();

export default {
    // Get all Devices
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await detaiEquipement.count({ where: { deleted: false } }),

            list = (await detaiEquipement.findMany({
                where: { deleted: false },
                select: {
                    id: true,
                    imei: true,
                    numeroParent: true,
                    numeroSim: true,
                    installed: true,
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
                    id: data?.id,
                    client: data?.OutStock?.Client,
                    marketeur: data?.OutStock?.Marketeur,
                    typeAbonnement: data?.TypeAbonnement,
                    imei: data?.imei,
                    numeroParent: data?.numeroParent,
                    sim: data?.numeroSim,
                    installed: data?.installed,
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

    // Get List
    getList: async () => {
        return (await detaiEquipement.findMany({
            where: { deleted: false },
            select: {
                id: true,
                numeroSim: true,
                OutStock: {
                    select: {
                        Client: {
                            select: {
                                nomComplet: true,
                                telephone: true,
                                adresse: true
                            }
                        }
                    }
                },
                TypeAbonnement: {
                    select: {
                        id: true,
                        forfait: true,
                        validite: true,
                        prix: true
                    }
                }
            }
        }))?.map(data => {
            return {
                value: data?.id,
                label: data?.numeroSim,
                client: data?.OutStock?.Client,
                typeAbonnement: data?.TypeAbonnement
            }
        });
    },

    // Get by ID
    getByID: async (id) => {
        const data = await detaiEquipement.findUnique({
            where: { id },
            select: {
                id: true,
                imei: true,
                numeroSim: true,
                installed: true,
                active: true,
                dateFinAbonnement: true,
                Reabonnement: {
                    where: { deleted: false },
                    select: {
                        dateAbonnement: true,
                        TypeAbonnement: { select: { forfait: true } },
                        prix: true,
                        montantPaye: true
                    }
                },
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
            }
        });

        return {
            id: data?.tr,
            client: data?.OutStock?.Client,
            marketeur: data?.OutStock?.Marketeur,
            typeAbonnement: data?.TypeAbonnement,
            imei: data?.imei,
            sim: data?.numeroSim,
            installed: data?.installed,
            active: data?.active,
            finAbonnement: data?.dateFinAbonnement,
            storyAbonnement: data?.Reabonnement
        }
    },
    // Update
    update: async (id, data) => {
        return await detaiEquipement.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await detaiEquipement.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await detaiEquipement.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await detaiEquipement.updateMany({
            data: { deleted: true }
        });
    }
};
