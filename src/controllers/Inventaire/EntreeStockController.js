import { errorMessage, successMessage } from "../../middlewares/Functions.js";
import EntreeStockService from "../../services/Inventaire/EntreeStockService.js";

export default {
    // create
    create: async ({ body }, res) => {
        try {
            const { produitList, date, ...info } = body;

            // check empty details equipement
            if (!produitList?.length)
                throw `Veillez ajouter au minimum un équipement...`;

            // check doublon produitList
            produitList?.map((data, i) => {
                const value = produitList
                    .filter(x => x?.equipementId === data?.equipementId)?.length
                if (value > 1) throw `L'équipement de la ligne ${++i} repris ${value} fois.`
            });

            const dateOperation = new Date(date ? date : Date.now()),
                data = await EntreeStockService?.create({ dateOperation, produitList, ...info });
            successMessage(res, `Operation reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get
    get: async ({ query }, res) => {
        try {
            const data = await EntreeStockService?.get(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ params }, res) => {
        try {
            const data = await EntreeStockService?.getByID(params?.id);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Update
    update: async ({ params, body }, res) => {
        try {
            const data = await EntreeStockService?.update(params?.id, body);
            successMessage(res, `Modification reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await EntreeStockService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await EntreeStockService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await EntreeStockService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};
