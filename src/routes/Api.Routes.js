import { Router } from "express";
import { VerifyToken } from "../services/Auth.js";
import UserController from "../controllers/Configuration/UserController.js";
import EquipementController from "../controllers/Inventaire/EquipementController.js";
import EntreeStockController from "../controllers/Inventaire/EntreeStockController.js";
import ClientController from "../controllers/CRM/ClientController.js";
import AgentController from "../controllers/Configuration/AgentController.js";
import TypeAbonnementController from "../controllers/Reabonnement/TypeAbonnementController.js";
import SortieStockController from "../controllers/Inventaire/SortieStockController.js";
import DeviceController from "../controllers/Reabonnement/DeviceController.js";
import AbonnementController from "../controllers/Reabonnement/AbonnementController.js";

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

    // Inventaires routes
    .post("/equipement", VerifyToken, EquipementController?.create)
    .get("/equipement", VerifyToken, EquipementController?.get)
    .get("/equipementList", VerifyToken, EquipementController?.getList)
    .get("/equipement/:id", VerifyToken, EquipementController?.getByID)
    .patch("/equipement/:id", VerifyToken, EquipementController?.update)
    .delete("/equipement/:id", VerifyToken, EquipementController?.delete)
    .delete("/equipementDeleteMany", VerifyToken, EquipementController?.deleteMany)
    .delete("/equipementDeleteAll", VerifyToken, EquipementController?.deleteAll)

    // Entrée stock
    .post("/appro", VerifyToken, EntreeStockController?.create)
    .get("/appro", VerifyToken, EntreeStockController?.get)
    .get("/appro/:id", VerifyToken, EntreeStockController?.getByID)
    .patch("/appro/:id", VerifyToken, EntreeStockController?.update)
    .delete("/appro/:id", VerifyToken, EntreeStockController?.delete)
    .delete("/approDeleteMany", VerifyToken, EntreeStockController?.deleteMany)
    .delete("/approDeleteAll", VerifyToken, EntreeStockController?.deleteAll)

    // sortie stock
    .post("/out", VerifyToken, SortieStockController?.create)
    .get("/out", VerifyToken, SortieStockController?.get)
    .get("/out/:id", VerifyToken, SortieStockController?.getByID)
    .patch("/out/:id", VerifyToken, SortieStockController?.update)
    .delete("/out/:id", VerifyToken, SortieStockController?.delete)
    .delete("/outDeleteMany", VerifyToken, SortieStockController?.deleteMany)
    .delete("/outDeleteAll", VerifyToken, SortieStockController?.deleteAll)

    // Client routes
    .post("/client", VerifyToken, ClientController?.create)
    .get("/client", VerifyToken, ClientController?.get)
    .get("/clientList", VerifyToken, ClientController?.getList)
    .get("/client/:id", VerifyToken, ClientController?.getByID)
    .patch("/client/:id", VerifyToken, ClientController?.update)
    .delete("/client/:id", VerifyToken, ClientController?.delete)
    .delete("/clientDeleteMany", VerifyToken, ClientController?.deleteMany)
    .delete("/clientDeleteAll", VerifyToken, ClientController?.deleteAll)

    // Agent routes
    .post("/agent", VerifyToken, AgentController?.create)
    .get("/agent", VerifyToken, AgentController?.get)
    .get("/agentList", VerifyToken, AgentController?.getList)
    .get("/agent/:id", VerifyToken, AgentController?.getByID)
    .patch("/agent/:id", VerifyToken, AgentController?.update)
    .delete("/agent/:id", VerifyToken, AgentController?.delete)
    .delete("/agentDeleteMany", VerifyToken, AgentController?.deleteMany)
    .delete("/agentDeleteAll", VerifyToken, AgentController?.deleteAll)

    // Reabonnement routes
    // type abonnement routes
    .post("/typeAbonnement", VerifyToken, TypeAbonnementController?.create)
    .get("/typeAbonnement", VerifyToken, TypeAbonnementController?.get)
    .get("/typeAbonnementList", VerifyToken, TypeAbonnementController?.getList)
    .get("/typeAbonnement/:id", VerifyToken, TypeAbonnementController?.getByID)
    .patch("/typeAbonnement/:id", VerifyToken, TypeAbonnementController?.update)
    .delete("/typeAbonnement/:id", VerifyToken, TypeAbonnementController?.delete)
    .delete("/typeAbonnementDeleteMany", VerifyToken, TypeAbonnementController?.deleteMany)
    .delete("/typeAbonnementDeleteAll", VerifyToken, TypeAbonnementController?.deleteAll)

    // Device
    .get("/device", VerifyToken, DeviceController?.get)
    .get("/deviceList", VerifyToken, DeviceController?.getList)
    .get("/device/:id", VerifyToken, DeviceController?.getByID)
    .patch("/device/:id", VerifyToken, DeviceController?.update)
    .delete("/device/:id", VerifyToken, DeviceController?.delete)
    .delete("/deviceDeleteMany", VerifyToken, DeviceController?.deleteMany)
    .delete("/deviceDeleteAll", VerifyToken, DeviceController?.deleteAll)

    // abonnement routes
    .post("/abonnement", VerifyToken, AbonnementController?.create)
    .get("/abonnement", VerifyToken, AbonnementController?.get)
    .get("/abonnement/:id", VerifyToken, AbonnementController?.getByID)
    .delete("/abonnement/:id", VerifyToken, AbonnementController?.delete)
    .delete("/abonnementDeleteMany", VerifyToken, AbonnementController?.deleteMany)
    .delete("/abonnementDeleteAll", VerifyToken, AbonnementController?.deleteAll)









