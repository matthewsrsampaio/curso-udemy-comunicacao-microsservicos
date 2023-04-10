const env = process.env;

export const MONGO_DB_URL = env.MONGO_DB_URL ? env.MONGO_DB_URL : "mongodb://localhost:27017/sales-db";
// Endereço do banco local no docker. ->    "mongodb://localhost:27017/sales-db";   obs: //O banco está sem SENHA mesmo
// Banco MONGODB Atlas (nuvem)        ->    "mongodb+srv://sales-db:sales-db@sales-db.l09pvkk.mongodb.net/?retryWrites=true&w=majority";

export const API_SECRET = env.API_SECRET ? env.API_SECRET : "YXV0aC1hcGktc2VjcmV0LWRldi0xMjM0NTY=";

export const RABBIT_MQ_URL = env.RABBIT_MQ_URL ? env.RABBIT_MQ_URL : "amqps://fhwzffwb:7dUwT5K5EeK_HJK0WY0tD0HciB7loqpz@beaver.rmq.cloudamqp.com/fhwzffwb";
// Lcal (docker)                      ->    "amqp://localhost:5672";
// Cloud ampq (mensageria NUVEM)      ->    "amqps://fhwzffwb:7dUwT5K5EeK_HJK0WY0tD0HciB7loqpz@beaver.rmq.cloudamqp.com/fhwzffwb";

export const PRODUCT_API_URL = env.PRODUCT_API_URL ? env.PRODUCT_API_URL : "http://localhost:8081/api/product";
