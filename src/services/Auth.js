import jwt from "jsonwebtoken";
import { errorMessage } from "../middlewares/Functions.js";

export const GenerateToken = (data, rememberMe) => {
    return jwt.sign(
        data,
        process.env.SECRET_TOKEN,
        { expiresIn: rememberMe ? '30d' : '8h' }
    );
};

export const DecodedToken = (token) => {
    return jwt.decode(token);
};

export const VerifyToken = ({ headers }, res, next) => {
    try {
        if (!jwt.verify(headers.authorization, process.env.SECRET_TOKEN))
            throw `Erreur token`;
        next();
    } catch (error) {
        errorMessage(res, error)
    }
};