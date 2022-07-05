const root = async (fastify, opts) => {
  fastify.get("/", async (re, reply) => {
    return {
      root: true
    };
  });
};
export default root;
