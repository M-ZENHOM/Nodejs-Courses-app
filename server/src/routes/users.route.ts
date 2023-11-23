import { Router } from 'express'
import { deleteUser, getUserInfo, updateUser } from "../controllers/users.controller";

const router = Router();

router.route("/:userId").get(getUserInfo).put(updateUser).delete(deleteUser);

export default router;