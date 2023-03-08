import amqp from "amqplib/callback_api.js";
import { RABBIT_MQ_URL } from "../../../config/constants/Secrets.js";
import { PRODUCT_TOPIC, PRODUCT_STOCK_UPDATE_ROUTING_KEY } from "../../../config/rabbitmq/Queue.js";
import {json} from "express";

export function sendMessageToProductStockUpdateQueue(message) {
    amqp.connect(RABBIT_MQ_URL, (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }
            let jsonStringMessage = JSON.stringify(message);
            console.info(`Sending message to product update stock: ${jsonStringMessage}`);
            channel.publish(
                PRODUCT_TOPIC,
                PRODUCT_STOCK_UPDATE_ROUTING_KEY,
                Buffer.from(jsonStringMessage)
            );
            console.info("Message was sent successfully!");
        });
    });
}

