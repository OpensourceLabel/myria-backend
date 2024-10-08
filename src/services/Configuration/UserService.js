import { PrismaClient } from "@prisma/client";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { generate } from "generate-password";
import { GenerateToken } from "../Auth.js";
const { user } = new PrismaClient();

export default {
    // create
    create: async (data) => {
        return await user.create({
            data: {
                ...data,
                username: data?.email,
                password: hashSync(`2298`, genSaltSync(10))
            }
        });
    },
    // login
    login: async (data) => {
        const userInfo = await user.findUnique({
            where: { username: data?.username },
            select: {
                id: true,
                fullname: true,
                sexe: true,
                role: true,
                password: true,
                etablissementId: true,
                active: true,
            }
        });

        if (!userInfo || userInfo?.deleted)
            throw `Le compte utilisateur introuvable.`;

        if (!userInfo?.active)
            throw `Accès intérdit au système.`;

        if (!compareSync(data?.password, userInfo?.password))
            throw `Mot de passe incorrect...`;

        const { password, active, ...info } = userInfo;

        return { ...info, token: GenerateToken(info, data?.rememberMe) }
    },
    // Get
    getAll: async (query) => {
        let page = !parseInt(query?.page) ? 1 : parseInt(query.page),
            limit = !parseInt(query?.limit) ? 10 : parseInt(query?.limit),
            totalAccount = await user.count({ where: { deleted: false } }),

            list = (await user.findMany({
                where: { deleted: false },
                skip: (page - 1) * limit,
                take: limit
            })).map(data => {
                const { deleted, createdAt, etablissementId, updatedAt, password, ...infos } = data;
                return infos
            });

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
        return await user.findUnique({
            where: { id }
        });
    },
    // Update
    update: async (id, data) => {
        return await user.update({
            where: { id }, data
        });
    },
    // Update password
    updatePassword: async (id, data) => {
        const userInfo = await user.findUnique({
            where: { id }
        });

        if (!userInfo)
            throw `ID user invalide...`;

        if (!compareSync(data?.oldPassword, userInfo?.password))
            throw `Ancien mot de passe invalide...`;

        return await user.update({
            where: { id },
            data: { password: hashSync(data?.newPassword, genSaltSync(10)) }
        })
    },
    // reset password
    resetPassword: async (id) => {
        const password = generate({ numbers: true, length: 15, strict: true });
        await user.update({
            where: { id },
            data: { password: hashSync(password, genSaltSync(10)) }
        });
        return { newpassword: password }
    },

    // toggle
    toggle: async (id) => {
        const data = await user?.findUnique({
            where: { id },
        });

        if (!data)
            throw `Compte utilisateur introuvable.`;

        return (await user?.update({
            where: { id },
            data: { active: !data?.active },
        }))?.active;

    },
    // Delete
    delete: async (id) => {
        return await user.update({
            where: { id },
            data: { deleted: true }
        });
    },
    // DeleteMany
    deleteMany: async (ids) => {
        return await user.updateMany({
            where: { id: { in: ids } },
            data: { deleted: true }
        });
    },
    // DeleteAll
    deleteAll: async () => {
        return await user.updateMany({
            data: { deleted: true }
        });
    }
};