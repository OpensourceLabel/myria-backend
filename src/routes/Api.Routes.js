import { Router } from "express";
import { VerifyToken } from "../services/Auth.js";
import EtablissementController from "../controllers/Configuration/EtablissementController.js";
import UserController from "../controllers/Configuration/UserController.js";
import DeviseController from "../controllers/Configuration/DeviseController.js";
import ExempleController from "../controllers/Configuration/ExempleController.js";

export default Router()
    // Etablissement routes
    .post("/etablissement", VerifyToken, EtablissementController?.create)
    .get("/etablissement", VerifyToken, EtablissementController?.get)
    .get("/etablissementList", VerifyToken, EtablissementController?.getList)
    .get("/etablissement", VerifyToken, EtablissementController?.getByID)
    .patch("/etablissement", VerifyToken, EtablissementController?.update)
    .delete("/etablissement/:id", VerifyToken, EtablissementController?.delete)
    .delete("/etablissementDeleteMany", VerifyToken, EtablissementController?.deleteMany)
    .delete("/etablissementDeleteAll", VerifyToken, EtablissementController?.deleteAll)

    // User routes
    .post("/login", UserController?.login)
    .post("/user", VerifyToken, UserController?.create)
    .get("/user", VerifyToken, UserController?.getAll)
    .get("/user/:id", VerifyToken, UserController?.getByID)
    .patch("/user/:id", VerifyToken, UserController?.update)
    .patch("/user/:id/role", VerifyToken, UserController?.update)
    .patch("/user/:id/email", VerifyToken, UserController?.update)
    .patch("/user/:id/password", VerifyToken, UserController?.updatePassword)
    .patch("/user/:id/reset", VerifyToken, UserController?.resetPassword)
    .patch("/user/:id/toggle", VerifyToken, UserController?.toggle)
    .delete("/user/:id", VerifyToken, UserController?.delete)
    .delete("/userDeleteMany", VerifyToken, UserController?.deleteMany)
    .delete("/userDeleteAll", VerifyToken, UserController?.deleteAll)

    // Routes devise
    .post("/devise", VerifyToken, DeviseController?.create)
    .get("/devise", VerifyToken, DeviseController?.get)
    .get("/deviseList", VerifyToken, DeviseController?.getAll)
    .get("/devise/:id", VerifyToken, DeviseController?.getByID)
    .patch("/devise/:id", VerifyToken, DeviseController?.update)
    .delete("/devise/:id", VerifyToken, DeviseController?.delete)
    .delete("/deviseDeleteMany", VerifyToken, DeviseController?.deleteMany)
    .delete("/deviseDeleteAll", VerifyToken, DeviseController?.deleteAll)

    // Routes exemple
    .post("/exemple", VerifyToken, ExempleController?.create)
    .get("/exemple", VerifyToken, ExempleController?.get)
    .get("/exempleList", VerifyToken, ExempleController?.getAll)
    .get("/exemple/:id", VerifyToken, ExempleController?.getByID)
    .patch("/exemple/:id", VerifyToken, ExempleController?.update)
    .delete("/exemple/:id", VerifyToken, ExempleController?.delete)
    .delete("/exempleDeleteMany", VerifyToken, ExempleController?.deleteMany)
    .delete("/exempleDeleteAll", VerifyToken, ExempleController?.deleteAll)
