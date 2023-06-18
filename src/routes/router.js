import { Router} from "express";
import { UserController } from "../controllers/userController.js";

const router = Router();

router.post('/sigin', UserController.validateUser);

export default router;