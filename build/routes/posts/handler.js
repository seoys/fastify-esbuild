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

// src/routes/posts/handler.ts
var handler_exports = {};
__export(handler_exports, {
  deletePostsHandler: () => deletePostsHandler,
  getOnePostHandler: () => getOnePostHandler,
  getPostsHandler: () => getPostsHandler,
  postPostsHandler: () => postPostsHandler,
  putPostsHandler: () => putPostsHandler
});
module.exports = __toCommonJS(handler_exports);

// src/routes/posts/datas.ts
var posts = [
  {
    id: 1,
    title: "Good Post!",
    published: true,
    content: "This is a good post",
    tags: ["featured"],
    deleted: false
  },
  {
    id: 2,
    title: "Better Post!",
    published: true,
    content: "This is an even better post",
    tags: ["featured", "popular"],
    deleted: false
  },
  {
    id: 3,
    title: "Great Post!",
    published: true,
    content: "This is a great post",
    tags: ["featured", "popular", "trending"],
    deleted: false
  }
];

// src/routes/posts/handler.ts
var getPostsHandler = async (req, reply) => {
  const { deleted } = req.query;
  if (deleted !== void 0) {
    const filteredPosts = posts.filter((post) => post.deleted === deleted);
    reply.send({ posts: filteredPosts });
  } else
    reply.send({ posts });
};
var getOnePostHandler = async (req, reply) => {
  const { postid } = req.params;
  const post = posts.find((p) => p.id == postid);
  if (post)
    reply.send({ posts: [post] });
  else
    reply.code(404).send({ error: "Post not found" });
};
var postPostsHandler = async (req, reply) => {
  const newPostID = posts.length + 1;
  const newPost = {
    id: newPostID,
    ...req.body
  };
  posts.push(newPost);
  console.log(posts);
  reply.code(201).header("Location", `/posts/${newPostID}`).send(newPost);
};
var putPostsHandler = async (req, reply) => {
  const { postid } = req.params;
  const post = posts.find((p) => p.id == postid);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    post.tags = req.body.tags;
    reply.code(204);
  } else {
    reply.code(404).send({ error: "Post not found" });
  }
};
var deletePostsHandler = async (req, reply) => {
  const { postid } = req.params;
  const post = posts.find((p) => p.id == postid);
  if (post) {
    post.deleted = true;
    reply.code(204);
  } else {
    reply.code(404).send({ error: "Post not found" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deletePostsHandler,
  getOnePostHandler,
  getPostsHandler,
  postPostsHandler,
  putPostsHandler
});
