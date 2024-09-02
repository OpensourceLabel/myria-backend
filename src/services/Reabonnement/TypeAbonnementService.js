import { PrismaClient } from "@prisma/client";
const { typeAbonnement } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        return await typeAbonnement.create({ data });
    },
    // Get
    get: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await typeAbonnement.count({ where: { deleted: false } }),

            list = await typeAbonnement.findMany({
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
        return (await typeAbonnement.findMany({
            where: { deleted: false }
        }))?.map(data => {
            return {
                value: data?.id,
                label: data?.forfait
            }
        });
    },
    // GetById
    getByID: async (id) => {
        return await typeAbonnement.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await typeAbonnement.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await typeAbonnement.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await typeAbonnement.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await typeAbonnement.updateMany({
            data: { deleted: true }
        });
    }
};
