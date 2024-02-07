import { PrismaClient } from "@prisma/client";
import validator from "validator";

const { user, recolte } = new PrismaClient();

// Response status 500
export const errorMessage = (res, message) => {
    res.status(500).json({
        state: false,
        message: message,
    });
};

// Response status 200
export const successMessage = (res, message, data) => {
    res.status(200).json({
        state: true,
        message: message,
        data: data
    });
};

// Check empty
export const checkEmpty = (object) => {
    for (const i in object) {
        if (!object[i]) {
            throw `Veillez remplir le Champ ${i}...`;
        }
    }
};

// Check email
export const isValidEmail = async (emailUser) => {
    if (!validator.isEmail(emailUser))
        throw `L'adresse e-mail ${emailUser} n'est pas valide.`;

    const data = await user.findUnique({
        where: { email: emailUser }
    });

    if (data?.email)
        throw `L'adresse e-mail ${emailUser} exite déjà...`;
};

// check data
export const checkData = (data) => {
    if (Array.isArray(data) && !data.length || !data)
        throw `Aucune information...`;
};

// check date
export const checkDate = (date) => {
    if (!(typeof date == `object` && date instanceof Date))
        throw `La date opération invalide...`;
    if (date > new Date())
        throw `Attention, tentative d'enregistrement opération d'une date ulterieure.`
}

