import { PrismaClient } from "@prisma/client";
import validator from "validator";

const { user, equipement, entreeStock, outStock, agent, client, reabonnement } = new PrismaClient();

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
};

// check number
export const checkNumber = (object) => {
    for (const i in object) {
        if (object[i] < 0 || typeof object[i] == 'string') {
            throw `La valeur du Champ ${i} est invalide...`;
        }
    }
};

// Format mois
export const FormatMonth = (date) => {
    return new Intl.DateTimeFormat(`fr-FR`, { month: `long`, year: `numeric` })
        .format(new Date(date))
};

// Get mois moins un
export const GetMonthmoinsUn = (mois) => {
    let year = new Date(mois).getFullYear(),
        month = new Date(mois).getMonth();
    return !month ? new Date(`${year - 1}-12`) :
        new Date(`${year}-${month?.toString().length > 1 ? month : `0${month}`}`);
};

// Get nombers day of month
export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

// Generate reference equipement
export const EquipementReference = async () => {
    const order = await equipement.count() + 1;
    return `EQ${order < 10 ? `00${order}` :
        order < 100 ? `0${order}` : order}`;
};

// Generate reference client
export const ClientReference = async () => {
    const order = await client.count() + 1;
    return `CL${order < 10 ? `00${order}` :
        order < 100 ? `0${order}` : order}`;
};

// Generate reference agent
export const AgentReference = async (categorie) => {
    const order = await agent.count({ where: { categorie: categorie } }) + 1;
    return `${categorie === `MARKETEUR` ? `AC` : `IT`}${order < 10 ? `00${order}` :
        order < 100 ? `0${order}` : order}/UHTEC`;
};

// Generate reference entreeStock
export const EntrerStockReference = async () => {
    const order = await entreeStock.count() + 1;
    return `IN${order < 10 ? `00${order}` :
        order < 100 ? `0${order}` : order}`;
};

// Generate reference outStock
export const SortieStockReference = async () => {
    const order = await outStock.count() + 1;
    return `OUT${order < 10 ? `00${order}` :
        order < 100 ? `0${order}` : order}`;
};

// Generate reference abonnement
export const AbonnementReference = async () => {
    const order = await reabonnement.count() + 1;
    return `ABNM-${order < 10 ? `00${order}` :
        order < 100 ? `0${order}` : order}`;
};

// Calcule date fin Abonnement
export const CalculerDateFinAbonnement = (nombreDeJours) => {
    // Obtenir la date actuelle
    const dateActuelle = new Date();
    // Ajouter le nombre de jours à la date actuelle
    dateActuelle.setDate(dateActuelle.getDate() + nombreDeJours);
    return dateActuelle;
};



