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
  getPostById,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// http://localhost:5000/posts

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.patch("/:id/savePost", savePost);
router.patch("/:id/viewPost", viewPost);
router.get("/:q/:d/:r/:s/:a", SearchFun);
export default router;
