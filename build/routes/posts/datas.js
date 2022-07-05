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

// src/routes/posts/datas.ts
var datas_exports = {};
__export(datas_exports, {
  posts: () => posts
});
module.exports = __toCommonJS(datas_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  posts
});
