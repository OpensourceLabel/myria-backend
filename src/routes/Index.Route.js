import { Router } from "express";
import { successMessage, errorMessage } from "../middlewares/Functions.js";
import upload from "../utils/Upload.js";

export default Router()
    .get("/", ({ }, res) => {
        res.send(`Welcome to your API`)
    })

    .post("/api/v1/upload", upload, ({ files }, res) => {
        try {

            if (!files?.length)
                throw `Aucun fichier uploadé.`;

            successMessage(res, `fichier uploadé avec suucès`, files.map(file => {
                return { pathFile: `/${file?.filename}` };
            }));
        } catch (error) {
            errorMessage(res, error);
        }
    })