import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  savePost,
  viewPost,
  SearchFun,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// http://localhost:5000/posts

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.patch("/:id/savePost", auth, savePost);
router.patch("/:id/viewPost", auth, viewPost);
router.get("/:q/:d/:r/:s/:a", SearchFun);
export default router;
