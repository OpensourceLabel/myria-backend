import { Router } from "express";
import { VerifyToken } from "../services/Auth.js";
import EntrepriseController from "../controllers/Configuration/EntrepriseController.js";
import UserController from "../controllers/Configuration/UserController.js";

export default Router()
    // Entreprise routes
    .post("/entreprise", VerifyToken, EntrepriseController?.create)
    .get("/entreprise", VerifyToken, EntrepriseController?.get)
    .get("/entrepriseList", VerifyToken, EntrepriseController?.getList)
    .get("/entreprise/:id", VerifyToken, EntrepriseController?.getByID)
    .patch("/entreprise/:id", VerifyToken, EntrepriseController?.update)
    .delete("/entreprise/:id", VerifyToken, EntrepriseController?.delete)
    .delete("/entrepriseDeleteMany", VerifyToken, EntrepriseController?.deleteMany)
    .delete("/entrepriseDeleteAll", VerifyToken, EntrepriseController?.deleteAll)

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
