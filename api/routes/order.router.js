import { Router } from 'express';

import {
  deleteOrder,
  fetchOrders,
  getOrder,
  updateOrder,
} from '../controllers/order.js';
import { verifySeller } from '../utils/verifyToken.js';

const router = Router();

router.get('/', fetchOrders);
router.get('/:id', getOrder);
router.put('/:id', verifySeller, updateOrder);
router.delete('/:id', verifySeller, deleteOrder);

export default router;
