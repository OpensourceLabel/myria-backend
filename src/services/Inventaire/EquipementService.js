import { PrismaClient } from "@prisma/client";
import { EquipementReference } from "../../middlewares/Functions.js";
const { equipement } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const reference = await EquipementReference();
        return await equipement.create({ data: { ...data, reference } });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await equipement.count({ where: { deleted: false } }),

            list = await equipement.findMany({
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
    // Get List
    getList: async () => {
        return (await equipement.findMany({
            where: { deleted: false }
        }))?.map(data => {
            return {
                value: data?.id,
                label: data?.libelle
            }
        });
    },
    // GetById
    getByID: async (id) => {
        return await equipement.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await equipement.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await equipement.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await equipement.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await equipement.updateMany({
            data: { deleted: true }
        });
    }
};
