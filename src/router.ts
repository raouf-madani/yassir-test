import { getPokemonByName } from "./handlers";

export default function router(fastify, opts, next) {

  fastify.get("/api/v2/pokemon/:name", getPokemonByName);
  next();
}