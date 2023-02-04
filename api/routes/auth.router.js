import { Router } from 'express';
import {
  getUserDetails,
  login,
  updateUserDetails,
} from '../controllers/auth.js';
import { verifySeller } from '../utils/verifyToken.js';

const router = Router();

router.post('/login', login);
router.get('/fetch', getUserDetails);
router.put('/', verifySeller, updateUserDetails);

export default router;
