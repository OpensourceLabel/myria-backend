import { PrismaClient } from "@prisma/client";
import { EntrerStockReference } from "../../middlewares/Functions.js";
const { equipement, entreeStock } = new PrismaClient();

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
                    data: { qteStock: { increment: equip?.qte } }
                });
            }
        });

        // Save operation
        const reference = await EntrerStockReference();
        return await entreeStock.create({
            data: {
                ...info,
                reference,
                DetailAppro: { createMany: { data: produitList } }
            }
        });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await entreeStock.count({ where: { deleted: false } }),

            list = await entreeStock.findMany({
                where: { deleted: false },
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
    // GetById
    getByID: async (id) => {
        return await entreeStock.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await entreeStock.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await entreeStock.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await entreeStock.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await entreeStock.updateMany({
            data: { deleted: true }
        });
    }
};
