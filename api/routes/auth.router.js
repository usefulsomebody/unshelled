import { Router } from "express";
import { getUserDetails, login, updateUserDetails } from "../controllers/auth.js";
import { verifySeller } from "../utils/verifyToken.js"

const router = Router();

router.post("/login", login);
router.get("/profile", getUserDetails);
router.put("/account", verifySeller, updateUserDetails);

export default router
