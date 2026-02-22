import express from "express";
import { executeGraph } from "../controllers/graphController.js";

const router = express.Router();

router.post('/execute',executeGraph)

export default router;
