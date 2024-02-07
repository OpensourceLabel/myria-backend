import { Router } from "express";

export default Router()
    .get("/", ({ }, res) => {
        res.send(`Welcome to your API`)
    })