import express from "express";
import userRoutes from "./src/modules/user/routes/UserRoutes.js";
import Tracing from "./src/config/Tracing.js";
import {createInitialData} from "./src/config/db/InitialData.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;
const CONTAINER_ENV = "container";

app.use(express.json());
startApplication();

function startApplication() {
    if(env.NODE_ENV !== CONTAINER_ENV) {
        createInitialData();
    }
}

app.get("/api/status", (req, res) => {
    return res.status(200).json({
        service: "Authorization-API",
        httpStatus: 200,
        status: "up",
    });
});

app.use(Tracing);

app.use(userRoutes);

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}`);
});
