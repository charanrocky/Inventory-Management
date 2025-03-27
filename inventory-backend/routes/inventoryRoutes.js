import express from "express";
import Inventory from "../models/Inventory.js";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";

import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getInventory);
router.post("/", auth, addInventory);
router.put("/:id", auth, updateInventory);
router.delete("/:id", auth, deleteInventory);

export default router;
