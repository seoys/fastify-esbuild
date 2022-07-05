import {FastifySchema} from 'fastify';
import {FromSchema} from 'json-schema-to-ts';


// Params Schema
const paramsSchema = {
  type: 'object',
  properties: {
    postid: { type: 'number' }
  },
  additionalProperties: false
} as const

// Querystring Schema
const querystringSchema = {
  type: 'object',
  properties: {
    deleted: { type: 'boolean' }
  },
  additionalProperties: false
} as const


export const postSchema = {
  $id: 'post',
  type: 'object',
  properties: {
    id: {type: 'number'},
    title: {type: 'string'},
    published: {type: 'boolean'},
    content: {type: 'string'},
    tags: {type: 'array', items: {type: 'string'}},
    deleted: {type: 'boolean'},
  },
  required: ['title', 'published', 'content', 'tags', 'deleted'],
} as const;

// Reply Schema
const replySchema = {
  type: 'object',
  properties: {
    // Return array of "post" object
    posts: {
      type: 'array',
          items: {
              $ref : 'post#'
          }
    }
  },
  additionalProperties: false
} as const


// ReplyNotFound Schema
export const postNotFoundSchema = {
  $id: 'postNotFound',
  type: 'object',
  required: ['error'],
  properties: {
    error: {type: 'string'},
  },
  additionalProperties: false,
} as const;

export type Params = FromSchema<typeof paramsSchema>;
export type Querystring = FromSchema<typeof querystringSchema>;
export type Body = FromSchema<typeof postSchema>;
export type Reply = FromSchema<typeof replySchema, {references: [typeof postSchema]}>;
export type PostNotFound = FromSchema<typeof postNotFoundSchema>;


/* Get */
export const getPostsSchema: FastifySchema = {
  // Routes with same tags will be grouped in Swagger UI
  tags: ['Posts'],
  description: 'Get posts',
  querystring: querystringSchema,
  response: {
    200: {
      // Return array of post
      ...replySchema
    }
  }
}

export const getOnePostSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Get a post by id',
  params: paramsSchema,
  response: {
    200: {
      ...replySchema
    },
    404: {
      description: 'The post was not found',
      // refer to postNotFound whenever a route use params
      $ref: 'postNotFound#'
    }
  }
}

/* Post */
export const postPostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Create a new post',
  body: postSchema,
  response: {
    201: {
      description: 'The post was created',
      // include a Location header that points to the URL of the new resource
      headers: {
        Location: {
          type: 'string',
          description: 'URL of the new resource'
        }
      },
      // Return newly created resource as the body of the response
      ...postSchema
    }
  }
}

/* Put */
export const putPostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Update a post',
  params: paramsSchema,
  body: postSchema,
  response: {
    204: {
      description: 'The post was updated',
      type: 'null'
    },
    404: {
      description: 'The post was not found',
      $ref: 'postNotFound#'
    }
  }
}

/* Delete */
export const deletePostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Delete a post',
  params: paramsSchema,
  response: {
    204: {
      description: 'The post was deleted',
      type: 'null'
    },
    404: {
      description: 'The post was not found',
      $ref: 'postNotFound#'
    }
  }
}