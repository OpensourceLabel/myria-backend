import { PrismaClient } from "@prisma/client";
import { EtablissementReference } from "../../middlewares/Functions.js";
const { etablissement } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const reference = await EtablissementReference();
        return await etablissement.create({ data: { ...data, reference } })
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await etablissement.count({ where: { deleted: false } }),

            list = await etablissement.findMany({
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
        return (await etablissement.findMany({
            where: { deleted: false }
        }))?.map(data => {
            return {
                value: data?.id,
                label: data?.nom,
            }
        });
    },
    // GetById
    getByID: async (id) => {
        return await etablissement.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await etablissement.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await etablissement.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await etablissement.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await etablissement.updateMany({
            data: { deleted: true }
        });
    }
};
