import express from 'express';
import { connectMongoDb } from "./src/config/db/MongoDbConfig.js";
import { createInitialData } from './src/config/db/InitialData.js'
import checkToken from "./src/config/auth/CheckToken.js";
import { connectRabbitMq } from "./src/config/rabbitmq/RabbitConfig.js";
import {listenToSalesConfimartionQueue} from "./src/modules/sales/rabbitmq/SalesConfirmationListener.js";
import {sendMessageToProductStockUpdateQueue} from "./src/modules/product/rabbitmq/ProductStockUpdateSender.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDb();

createInitialData();

connectRabbitMq();

// app.use(checkToken);

app.get("/teste", (req, res) => {
    try{
        sendMessageToProductStockUpdateQueue([
            {
                productId: 1001,
                quantity: 3
            },
            {
                productId: 1002,
                quantity: 2
            },
            {
                productId: 1003,
                quantity: 1
            }
        ])
        return res.status(200).json({status:200});
    }catch (err) {
        console.log(err);
        return res.status(500).json({error:true});
    }
});

app.get("/api/status", async (req, res) => { // Isto aqui é um EndPoint
    return res.status(200).json({
        service: "Sales-API",
        httpStatus: 200,
        status: "up",
    });
});

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}`);
})
