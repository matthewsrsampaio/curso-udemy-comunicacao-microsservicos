import amqp from "amqplib/callback_api.js";
import {RABBIT_MQ_URL} from "../constants/Secrets.js";
import {
    PRODUCT_TOPIC,
    PRODUCT_STOCK_UPDATE_QUEUE,
    PRODUCT_STOCK_UPDATE_ROUTING_KEY,
    SALES_CONFIRMATION_QUEUE,
    SALES_CONFIRMATION_ROUTING_KEY
} from "./Queue.js";
import { listenToSalesConfimartionQueue } from "../../modules/sales/rabbitmq/SalesConfirmationListener.js";

const TWO_SECONDS = 2000;

export async function connectRabbitMq() {
    await connectRabbitMqCreateQueues();
}

async function connectRabbitMqCreateQueues() {
    amqp.connect(RABBIT_MQ_URL, {timeout: 180000}, (error, connection) => {
        if (error) {
            throw error;
        }
        console.info("Starting RabbitMQ...");
        createQueue(
            connection,
            PRODUCT_STOCK_UPDATE_QUEUE,
            PRODUCT_STOCK_UPDATE_ROUTING_KEY,
            PRODUCT_TOPIC
        )
        console.info("Construiu a fila de produto");
        createQueue(
            connection,
            SALES_CONFIRMATION_QUEUE,
            SALES_CONFIRMATION_ROUTING_KEY,
            PRODUCT_TOPIC
        )
        console.info("Construiu a fila de confirmação de venda");
        console.info("Queues and Topics were defined.");
        setTimeout(function () {
            connection.close();
        }, TWO_SECONDS)
    });
    setTimeout(function () {
        listenToSalesConfimartionQueue();
    }, TWO_SECONDS);
}

function createQueue(connection, queue, routingKey, topic) {
    connection.createChannel((error, channel) => {
        if (error) {
            throw error;
        }
        //chame as coisas certinhas aqui, senão vai dar bucho.
        channel.assertExchange(topic, "topic", {durable:true});
        console.log("RabbitMQ chamou o topico");
        channel.assertQueue(queue, {durable:true});
        console.log("RabbitMQ chamou a queue");
        channel.bindQueue(queue, topic, routingKey);
        console.log("RabbitMQ chamou o BIND_QUEUE");
    });
}
