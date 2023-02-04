import { Router } from "express";
import {
  updateOrder,
  fetchOrders,
  deleteOrder,
  getOrder
} from "../controllers/order.js";
import { verifySeller } from "../utils/verifyToken.js";

const router = Router();

router.get("/order_items", fetchOrders);
router.get("/:id/order_items", fetchOrders);
router.get("/order_item/:id", getOrder);
router.put("/:id/update", verifySeller, updateOrder);
router.delete("/:id/delete", verifySeller, deleteOrder);

export default router;
