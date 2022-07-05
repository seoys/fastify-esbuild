import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "path";
const fastify = Fastify({
  logger: true
});
fastify.register(autoLoad, {
  dir: join(__dirname, "routes")
});
const start = async () => {
  try {
    await fastify.listen({
      port: 8088
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
export default fastify;
start();
