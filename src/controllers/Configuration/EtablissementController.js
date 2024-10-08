import { errorMessage, successMessage } from "../../middlewares/Functions.js";
import { DecodedToken } from "../../services/Auth.js";
import EtablissementService from "../../services/Configuration/EtablissementService.js";

export default {
    // create
    create: async ({ body }, res) => {
        try {
            const data = await EtablissementService?.create(body);
            successMessage(res, `Operation reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get
    get: async ({ query }, res) => {
        try {
            const data = await EtablissementService?.get(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get list
    getList: async ({ }, res) => {
        try {
            const data = await EtablissementService?.getList();
            successMessage(res, `${data?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ headers, params }, res) => {
        try {
            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await EtablissementService?.getByID(etablissementId);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Update
    update: async ({ headers, params, body }, res) => {
        try {
            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await EtablissementService?.update(etablissementId, body);
            successMessage(res, `Modification reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await EtablissementService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await EtablissementService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await EtablissementService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};
