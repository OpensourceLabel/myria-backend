import { PrismaClient } from "@prisma/client";
import { ClientReference } from "../../middlewares/Functions.js";
const { client } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const reference = await ClientReference();
        return await client.create({ data: { ...data, reference } });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await client.count({ where: { deleted: false } }),

            list = await client.findMany({
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
        return (await client.findMany({
            where: { deleted: false }
        }))?.map(data => {
            return {
                value: data?.id,
                label: data?.nomComplet
            }
        });
    },
    // GetById
    getByID: async (id) => {
        return await client.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await client.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await client.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await client.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await client.updateMany({
            data: { deleted: true }
        });
    }
};
