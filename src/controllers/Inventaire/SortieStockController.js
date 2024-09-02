import { errorMessage, successMessage } from "../../middlewares/Functions.js";
import SortieStockService from "../../services/Inventaire/SortieStockService.js";

export default {
    // create
    create: async ({ body }, res) => {
        try {
            const { produitList, date, ...info } = body;

            // check empty details equipement
            if (!produitList?.length)
                throw `Veillez ajouter au minimum un équipement...`;

            // check telephone et imei
            produitList?.map((data, i) => {
                if (!data?.numeroSim || !data?.imei)
                    throw `Veillez remplir IMEI et le numero SIM de la ligne ${++i}`

                const valueImei = produitList
                    .filter(x => x?.imei === data?.imei)?.length,
                    valueTelephone = produitList
                        .filter(x => x?.numeroSim === data?.numeroSim)?.length;

                if (valueImei > 1)
                    throw `L'IMEI de la ligne ${++i} repris ${value} fois.`;

                if (valueTelephone > 1)
                    throw `Le numéro ${data?.numeroSim} de la ligne ${++i} repris ${value} fois.`;
            });

            const dateOperation = new Date(date ? date : Date.now()),
                data = await SortieStockService?.create({ dateOperation, produitList, ...info });
            successMessage(res, `Operation reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Get
    get: async ({ query }, res) => {
        try {
            const data = await SortieStockService?.get(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },
    // Get all devices
    getAllDevice: async ({ query }, res) => {
        try {
            const data = await SortieStockService?.getAllDevice(query);
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // GetById
    getByID: async ({ params }, res) => {
        try {
            const data = await SortieStockService?.getByID(params?.id);
            successMessage(res, `Detail info`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Update
    update: async ({ params, body }, res) => {
        try {
            const { produitList, date, ...info } = body;

            // check empty details equipement
            if (!produitList?.length)
                throw `Veillez ajouter au minimum un équipement...`;

            // check telephone et imei
            produitList?.map((data, i) => {
                if (!data?.numeroSim || !data?.imei)
                    throw `Veillez remplir IMEI et le numero SIM de la ligne ${++i}`

                const valueImei = produitList
                    .filter(x => x?.imei === data?.imei)?.length,
                    valueTelephone = produitList
                        .filter(x => x?.numeroSim === data?.numeroSim)?.length;

                if (valueImei > 1)
                    throw `L'IMEI de la ligne ${++i} repris ${valueImei} fois.`;

                if (valueTelephone > 1)
                    throw `Le numéro ${data?.numeroSim} de la ligne ${++i} repris ${valueTelephone} fois.`;
            });

            const dateOperation = new Date(date ? date : Date.now()),
                data = await SortieStockService?.update(params?.id, { dateOperation, produitList, ...info });
            successMessage(res, `Modification reussie...`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // Delete
    delete: async ({ params }, res) => {
        try {
            await SortieStockService?.delete(params?.id);
            successMessage(res, `Suppression reussie...`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await SortieStockService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await SortieStockService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
};
