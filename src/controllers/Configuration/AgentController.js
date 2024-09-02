import { errorMessage, successMessage } from "../../middlewares/Functions.js";
import AgentService from "../../services/Configuration/AgentService.js";

export default {
    // create
    create: async ({ body }, res) => {
        try {
            const data = await AgentService?.create(body);
            successMessage(res, `Operation reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get
    get: async ({ query }, res) => {
        try {
            const data = await AgentService?.get(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get list
    getList: async ({ }, res) => {
        try {
            const data = await AgentService?.getList();
            successMessage(res, `${data?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ params }, res) => {
        try {
            const data = await AgentService?.getByID(params?.id);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Update
    update: async ({ params, body }, res) => {
        try {
            const data = await AgentService?.update(params?.id, body);
            successMessage(res, `Modification reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await AgentService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await AgentService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await AgentService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};
