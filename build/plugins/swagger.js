import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
export default fp(async (fastify, opts) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: "Fastify REST API",
        description: "Use JSON Schema & TypeScript for better DX",
        version: "0.1.0"
      },
      servers: [
        {
          url: "http://localhost:8080"
        }
      ]
    },
    exposeRoute: true
  });
});
