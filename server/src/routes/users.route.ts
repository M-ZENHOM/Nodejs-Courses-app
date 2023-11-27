import { Router } from 'express'
import { deleteUser, getUserInfo, updateUser } from "../controllers/users.controller";
import { verfiyToken } from '../middlewares/tokenHandlers';
import { upload } from '../middlewares/uploadImages';

const router = Router();

router.route("/:userId").get(getUserInfo).put(verfiyToken, upload.single("avatar"), updateUser).delete(verfiyToken, deleteUser);

export default router;