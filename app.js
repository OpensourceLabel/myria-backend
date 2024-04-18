import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import cors from "cors";
import "dotenv/config.js";

/** Import Routers */
import ApiRoutes from "./src/routes/Api.Routes.js";
import IndexRoute from "./src/routes/Index.Route.js";
import { CheckApi } from "./configs/Api.Config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** init Server and config */
const app = express(),
    port = process.env.PORT ?
        process.env.PORT : 3000;

app
    .use(cors())
    .use(logger("combined"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, "src/public/uploads")))
    .use("/", IndexRoute)
    .use("/api/v1", ApiRoutes)

    .listen(port, console.log(`Server started on port : ${process.env.PORT}`));
(async () => {
    await CheckApi();
})()

export default app;
