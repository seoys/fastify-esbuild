import {FastifyPluginAsync} from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => 'Hi there!');
};

export default root;
