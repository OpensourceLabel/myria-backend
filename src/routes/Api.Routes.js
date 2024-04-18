import { Router } from "express";
import { VerifyToken } from "../services/Auth.js";
import UserController from "../controllers/Configuration/UserController.js";

export default Router()
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







