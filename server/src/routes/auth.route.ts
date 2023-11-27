import { Router } from 'express'
import { register, login, logout } from "../controllers/auth.controller";
import { verfiyToken } from '../middlewares/tokenHandlers';

const router = Router();

router.route("/logout").get(verfiyToken, logout);
router.route("/register").post(register);
router.route("/login").post(login);


export default router;