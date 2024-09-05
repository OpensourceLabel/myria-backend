import { genSaltSync, hashSync } from "bcrypt";

export default {
    DefaultEntreprise: {
        nom: `Nom Entreprise`,
        idNat: `N° Identité nationale`,
        rccm: `RCCM`,
        numeroImpot: `N° Impot`,
        adresse: {
            pays: `Pays`,
            ville: `Ville`,
            rue: `rue`
        },
        contact: {
            email: `contact@domain.com`,
            telephone: `N° telephone`
        }
    },
    AdminSys: {
        fullname: `Administateur`,
        email: `admin@exemple.com`,
        role: `ADMIN`,
        username: `admin@exemple.com`,
        password: hashSync(`2298`, genSaltSync(10))
    }
}