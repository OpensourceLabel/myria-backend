import { errorMessage, successMessage } from "../../middlewares/Functions.js";
import DeviceService from "../../services/Reabonnement/DeviceService.js";

export default {
    // Get
    get: async ({ query }, res) => {
        try {
            const data = await DeviceService?.get(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get List
    getList: async ({ }, res) => {
        try {
            const data = await DeviceService?.getList();
            successMessage(res, `${data?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ params }, res) => {
        try {
            const data = await DeviceService?.getByID(params?.id);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Update
    update: async ({ params, body }, res) => {
        try {
            const data = await DeviceService?.update(params?.id, body);
            successMessage(res, `Modification reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await DeviceService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await DeviceService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await DeviceService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};
