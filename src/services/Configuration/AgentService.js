import { PrismaClient } from "@prisma/client";
import { AgentReference } from "../../middlewares/Functions.js";
const { agent } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const reference = await AgentReference(data?.categorie ? data?.categorie : `TECHNICIEN`);
        return await agent.create({ data: { ...data, reference } });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await agent.count({ where: { deleted: false } }),

            list = await agent.findMany({
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
        return (await agent.findMany({
            where: { deleted: false }
        }))?.map(data => {
            return {
                value: data?.id,
                label: data?.nomComplet,
                categorie: data?.categorie
            }
        });
    },
    // GetById
    getByID: async (id) => {
        return await agent.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await agent.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await agent.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await agent.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await agent.updateMany({
            data: { deleted: true }
        });
    }
};
