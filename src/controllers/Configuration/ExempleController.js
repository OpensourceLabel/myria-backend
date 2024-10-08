import { checkEmpty, errorMessage, successMessage } from "../../middlewares/Functions.js";
import { DecodedToken } from "../../services/Auth.js";
import ExempleService from "../../services/Configuration/ExempleService.js";


export default {
    // create
    create: async ({ headers, body }, res) => {
        try {
            checkEmpty(body)
            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await ExempleService?.create({ ...body, etablissementId });
            successMessage(res, `Operation reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get
    get: async ({ headers, query }, res) => {
        try {
            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await ExempleService?.get(query, etablissementId);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get All
    getAll: async ({ headers }, res) => {
        try {
            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await ExempleService?.getAll(etablissementId);
            successMessage(res, `${data?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ params }, res) => {
        try {
            const data = await ExempleService?.getByID(params?.id);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Update
    update: async ({ params, body }, res) => {
        try {
            checkEmpty(body)
            const data = await ExempleService?.update(params?.id, body);
            successMessage(res, `Modification reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await ExempleService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await ExempleService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ headers }, res) => {
        try {
            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await ExempleService?.deleteAll(etablissementId);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};