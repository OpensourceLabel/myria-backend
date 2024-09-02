import { checkEmpty, errorMessage, successMessage } from "../../middlewares/Functions.js";
import AbonnementService from "../../services/Reabonnement/AbonnementService.js";

export default {
    // create
    create: async ({ body }, res) => {
        try {
            checkEmpty(body)
            const { deviceId } = body,
                data = await AbonnementService?.create({ deviceId });
            successMessage(res, `Operation reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get
    get: async ({ query }, res) => {
        try {
            const data = await AbonnementService?.get(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ params }, res) => {
        try {
            const data = await AbonnementService?.getByID(params?.id);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // // Update
    // update: async ({ params, body }, res) => {
    //     try {
    //         const data = await AbonnementService?.update(params?.id, body);
    //         successMessage(res, `Modification reussie...`, data)
    //     } catch (error) {
    //         errorMessage(res, error)
    //     }
    // },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await AbonnementService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await AbonnementService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await AbonnementService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};
