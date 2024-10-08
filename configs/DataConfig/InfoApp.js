import { genSaltSync, hashSync } from "bcrypt";

export default {
    DefaulDevise: {
        code: `CDF`,
        libelle: `Franc Congolais`
    },
    DefaultEtablissement: {
        nom: `Nom Entreprise`,
        adresse: `Adresse`,
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
    },
    Exemple: [
        {
            reference: `EX001`,
            libelle: `EXEMPLE 1`
        },
        {
            reference: `EX002`,
            libelle: `EXEMPLE 2`
        }
    ]
}