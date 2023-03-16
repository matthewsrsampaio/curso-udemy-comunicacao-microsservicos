import express from "express";
import * as db from "./src/config/db/InitialData.js";
import userRoutes from "./src/modules/user/routes/UserRoutes.js";
import Tracing from "./src/config/Tracing.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.createInitialData();

app.use(Tracing);
app.get("/api/status", (req, res) => {
    return res.status(200).json({
        service: "Authorization-API",
        httpStatus: 200,
        status: "up",
    });
});

app.use(express.json());

app.use(userRoutes);

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}`);
});
