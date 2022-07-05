const paramsSchema = {
  type: "object",
  properties: {
    postid: { type: "number" }
  },
  additionalProperties: false
};
const querystringSchema = {
  type: "object",
  properties: {
    deleted: {
      type: "boolean"
    }
  },
  additionalProperties: false
};
export const postSchema = {
  $id: "post",
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    published: { type: "boolean" },
    content: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    deleted: { type: "boolean" }
  },
  required: ["title", "published", "content", "tags", "deleted"]
};
const replySchema = {
  type: "object",
  properties: {
    posts: {
      type: "array",
      items: {
        $ref: "post#"
      }
    }
  },
  additionalProperties: false
};
export const postNotFoundSchema = {
  $id: "postNotFound",
  type: "object",
  required: ["error"],
  properties: {
    error: { type: "string" }
  },
  additionalProperties: false
};
export const getPostsSchema = {
  tags: ["Posts"],
  description: "Get posts",
  querystring: querystringSchema,
  response: {
    200: {
      ...replySchema
    }
  }
};
export const getOnePostSchema = {
  tags: ["Posts"],
  description: "Get a post by id",
  params: paramsSchema,
  response: {
    200: {
      ...replySchema
    },
    404: {
      description: "The post was not found",
      $ref: "postNotFound#"
    }
  }
};
export const postPostsSchema = {
  tags: ["Posts"],
  description: "Create a new post",
  body: postSchema,
  response: {
    201: {
      description: "The post was created",
      headers: {
        Location: {
          type: "string",
          description: "URL of the new resource"
        }
      },
      ...postSchema
    }
  }
};
export const putPostsSchema = {
  tags: ["Posts"],
  description: "Update a post",
  params: paramsSchema,
  body: postSchema,
  response: {
    204: {
      description: "The post was updated",
      type: "null"
    },
    404: {
      description: "The post was not found",
      $ref: "postNotFound#"
    }
  }
};
export const deletePostsSchema = {
  tags: ["Posts"],
  description: "Delete a post",
  params: paramsSchema,
  response: {
    204: {
      description: "The post was deleted",
      type: "null"
    },
    404: {
      description: "The post was not found",
      $ref: "postNotFound#"
    }
  }
};
