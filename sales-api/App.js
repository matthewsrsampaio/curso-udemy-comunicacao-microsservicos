import express from 'express';
import {connectMongoDb} from "./src/config/db/MongoDbConfig.js";
import {createInitialData} from './src/config/db/InitialData.js'
import {connectRabbitMq} from "./src/config/rabbitmq/RabbitConfig.js";
import {sendMessageToProductStockUpdateQueue} from "./src/modules/product/rabbitmq/ProductStockUpdateSender.js";
import orderRoutes from "./src/modules/sales/routes/OrderRoutes.js";
import checkToken from "./src/config/auth/CheckToken.js";
import tracing from "./src/config/Tracing.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDb();
createInitialData();
connectRabbitMq();

app.use(express.json());
app.use(tracing);
app.use(checkToken);
app.use(orderRoutes);

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

// app.get("/teste", (req, res) => {
//     try{
//         sendMessageToProductStockUpdateQueue([
//             {
//                 productId: 1001,
//                 quantity: 3
//             },
//             {
//                 productId: 1002,
//                 quantity: 2
//             },
//             {
//                 productId: 1003,
//                 quantity: 1
//             }
//         ])
//         return res.status(200).json({status:200});
//     }catch (err) {
//         console.log(err);
//         return res.status(500).json({error:true});
//     }
// });
