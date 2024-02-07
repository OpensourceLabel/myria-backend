import { PrismaClient } from "@prisma/client";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { generate } from "generate-password";
import { GenerateToken } from "../Auth.js";

const { user } = new PrismaClient();

export default {
    // create
    create: async (userData) => {
        await user.create({
            data: {
                ...userData,
                username: userData?.email,
                password: hashSync(`2298`, genSaltSync(10))
            }
        })
    },

    // login
    login: async (userData) => {
        const userInfo = await user.findUnique({
            where: { username: userData?.username },
            select: {
                id: true,
                fullname: true,
                sexe: true,
                role: true,
                password: true,
                active: true
            }
        });

        if (!userInfo || userInfo?.deleted)
            throw `Le compte utilisateur introuvable.`;

        if (!userInfo?.active)
            throw `Accès intérdit au système.`;

        if (!compareSync(userData?.password, userInfo?.password))
            throw `Mot de passe incorrect...`;

        return {
            ...userInfo,
            token: GenerateToken(userInfo)
        }
    },

    // get all user
    getAll: async () => {
        return (await user.findMany({
            where: { deleted: false }
        })).map(data => {
            const { deleted, createdAt, updatedAt, password, ...infos } = data;
            return infos;
        })
    },

    // get by ID
    getByID: async (userID) => {
        return await user.findUnique({
            where: { id: userID }
        })
    },

    // update
    update: async (userID, userData) => {
        return await user.update({
            where: { id: userID },
            data: userData
        })
    },

    // update password
    updatePassword: async (userID, old, password) => {
        const userData = await user.findUnique({
            where: { id: userID }
        });

        if (!userData)
            throw `ID user invalide...`;

        if (!compareSync(old, userData?.password))
            throw `Ancien mot de passe invalide...`;

        return await user.update({
            where: { id: userID },
            data: { password: hashSync(password, genSaltSync(10)) }
        })
    },

    // reset password
    resetPassword: async (userID) => {
        const password = generate({ numbers: true, length: 15, strict: true });
        await user.update({
            where: { id: userID },
            data: { password: hashSync(password, genSaltSync(10)) }
        });
        return {
            newpassword: password
        }
    },

    // toggle
    toggle: async (userID) => {
        const userData = await user?.findUnique({
            where: { id: userID },
        });

        if (!userData)
            throw `Compte utilisateur introuvable.`;

        return (await user?.update({
            where: { id: userID },
            data: { active: !userData?.active },
        }))?.active;

    },

    // delete
    delete: async (userID) => {
        await user.update({
            where: { id: userID },
            data: { deleted: true }
        })
    }
}