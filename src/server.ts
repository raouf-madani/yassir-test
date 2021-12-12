import app from "./app";
require('dotenv').config(); 
//Fix error 4 (install dotenv dependency and assign 80 to FASTIFY_PORT in .env file)

const FASTIFY_PORT = parseInt(process.env.FASTIFY_PORT) || 3000;

app.listen(FASTIFY_PORT);

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
