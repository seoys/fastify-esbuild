var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/posts/schema.ts
var schema_exports = {};
__export(schema_exports, {
  deletePostsSchema: () => deletePostsSchema,
  getOnePostSchema: () => getOnePostSchema,
  getPostsSchema: () => getPostsSchema,
  postNotFoundSchema: () => postNotFoundSchema,
  postPostsSchema: () => postPostsSchema,
  postSchema: () => postSchema,
  putPostsSchema: () => putPostsSchema
});
module.exports = __toCommonJS(schema_exports);
var paramsSchema = {
  type: "object",
  require: ["postid"],
  properties: {
    postid: { type: "number" }
  },
  additionalProperties: false
};
var querystringSchema = {
  type: "object",
  properties: {
    deleted: { type: "boolean" }
  },
  additionalProperties: false
};
var postSchema = {
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
var replySchema = {
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
var postNotFoundSchema = {
  $id: "postNotFound",
  type: "object",
  required: ["error"],
  properties: {
    error: { type: "string" }
  },
  additionalProperties: false
};
var getPostsSchema = {
  tags: ["Posts"],
  description: "Get posts",
  querystring: querystringSchema,
  response: {
    200: {
      ...replySchema
    }
  }
};
var getOnePostSchema = {
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
var postPostsSchema = {
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
var putPostsSchema = {
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
var deletePostsSchema = {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deletePostsSchema,
  getOnePostSchema,
  getPostsSchema,
  postNotFoundSchema,
  postPostsSchema,
  postSchema,
  putPostsSchema
});
