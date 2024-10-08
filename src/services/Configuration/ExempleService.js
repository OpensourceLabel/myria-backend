import { PrismaClient } from "@prisma/client";
import { ExempleReference } from "../../middlewares/Functions.js";
const { exemple } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        const reference = await ExempleReference(data?.etablissementId);
        return await exemple.create({ data: { ...data, reference } });
    },
    // Get
    get: async (query, etablissementId) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await exemple.count({ where: { deleted: false, etablissementId } }),

            list = await exemple.findMany({
                where: { deleted: false, etablissementId },
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
    getAll: async (etablissementId) => {
        return (await exemple.findMany({
            where: { deleted: false, etablissementId }
        })).map(data => {
            return {
                value: data?.id,
                label: data?.libelle
            }
        })
    },
    // GetById
    getByID: async (id) => {
        return await exemple.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await exemple.update({
            where: { id }, data
        });
    },
    // Delete
    delete: async (id) => {
        return await exemple.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await exemple.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async (etablissementId) => {
        return await exemple.updateMany({
            where: { etablissementId },
            data: { deleted: true }
        });
    }
};