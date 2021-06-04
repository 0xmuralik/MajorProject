import express from "express";

import {
  getDomains,
  createDomain,
  subscribe,
  deleteDomain,
  getDomainById,
  user_subscribed_and_unsubscribed,
  getIdAndName
} from "../controllers/domains.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// http://localhost:5000/domains

router.get("/", getDomains);
router.get(
  "/subscribed_and_unsubscribed",
  auth,
  user_subscribed_and_unsubscribed
);
router.get("/:id/getdomain", getDomainById);
router.get("/getIdAndName",getIdAndName)
router.post("/", auth, createDomain);
router.patch("/:id/subscribe", auth, subscribe);
router.delete("/:id", auth, deleteDomain);

export default router;
