import { PrismaClient } from "@prisma/client";
const { devise } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        return await devise.create({ data });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await devise.count({ where: { deleted: false } }),

            list = await devise.findMany({
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
    // Get all
    getAll: async () => {
        return await devise.findMany({
            where: { deleted: false }
        })
    },
    // GetById
    getByID: async (id) => {
        return await devise.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await devise.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await devise.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await devise.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await devise.updateMany({
            data: { deleted: true }
        });
    }
};