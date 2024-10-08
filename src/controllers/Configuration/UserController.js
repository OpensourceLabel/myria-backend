import {
    checkData,
    checkEmpty,
    errorMessage,
    isValidEmail,
    successMessage
} from "../../middlewares/Functions.js";
import { DecodedToken } from "../../services/Auth.js";
// import { DecodedToken } from "../../services/Auth.js";
import UserService from "../../services/Configuration/UserService.js";

export default {
    // create
    create: async ({ headers, body }, res) => {
        try {
            const { email, fullname, role } = body;

            checkEmpty({ email, fullname, role })
            await isValidEmail(email)

            const { etablissementId } = DecodedToken(headers?.authorization),
                data = await UserService?.create({ ...body, etablissementId });
            successMessage(res, `utilisateur ajouté avec succès`, data)
        } catch (error) {
            console.error(error);
            
            errorMessage(res, error)
        }
    },

    // login
    login: async ({ body }, res) => {
        try {
            checkEmpty(body)
            const data = await UserService?.login(body);
            successMessage(res, `Connexion établie`, data)
        } catch (error) {
            console.error(error);

            errorMessage(res, error)
        }
    },

    // get All
    getAll: async ({ query }, res) => {
        try {
            const data = await UserService?.getAll(query);
            checkData(data)
            successMessage(res, `${data?.list?.length} resultat(s) trouvé(s)`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // get by ID
    getByID: async ({ params }, res) => {
        try {
            const data = await UserService?.getByID(params?.id);
            checkData(data)
            successMessage(res, `Detail ${data?.fullname}`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // update
    update: async ({ params, body }, res) => {
        try {
            const { email, fullname, role } = body;

            email ? checkEmpty({ email }) :
                role ? checkEmpty({ role }) :
                    checkEmpty({ fullname })

            if (email) {
                await isValidEmail(email)
            }
            await UserService?.update(params?.id, body);
            successMessage(res, `Mise à jour infos utilisateur reussie`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // update password
    updatePassword: async ({ headers, params, body }, res) => {
        try {
            checkEmpty(body)
            const { oldPassword, newPassword } = body,
                userID = params?.id;;
            // userID = DecodedToken(headers?.authorization)?.id;

            await UserService?.updatePassword(userID, { oldPassword, newPassword });
            successMessage(res, `Mot de passe modifié avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // reset password
    resetPassword: async ({ params }, res) => {
        try {
            const data = await UserService?.resetPassword(params?.id);
            successMessage(res, `Mot de passe réinitialisé avec succès`, data)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // toggle
    toggle: async ({ params }, res) => {
        try {
            const etatUser = await UserService?.toggle(params?.id);
            successMessage(res, `Utilisateur ${etatUser ? `activé` : `desactivé`} avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // delete
    delete: async ({ params }, res) => {
        try {
            await UserService?.delete(params?.id);
            successMessage(res, `Utilisateur supprimé avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },
    // DeleteMany
    deleteMany: async ({ body }, res) => {
        try {
            const data = await UserService?.deleteMany(body?.data);
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    },

    // DeleteAll
    deleteAll: async ({ }, res) => {
        try {
            const data = await UserService?.deleteAll();
            successMessage(res, `${data?.count} ligne(s) Supprimée(s) avec succès`)
        } catch (error) {
            errorMessage(res, error)
        }
    }
}


