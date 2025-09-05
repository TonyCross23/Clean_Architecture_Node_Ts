import Router from 'express';
import { validate } from '../../../middlewares/validate';
import { loginSchema, registerSchema, token } from '../validation/auth.validation';
import { AuthController } from '../controllers/authController';
import container from '../config/container';
import { INTERFACE_TYPE } from '../utils/appConst';
import { Request, Response } from 'express';
import { authMiddleware } from '../../../middlewares/authMiddleware';

const authRouter = Router();

const authController = container.get<AuthController>(INTERFACE_TYPE.AuthController);

authRouter.post("/register", validate(registerSchema), authController.registerUser);
authRouter.post("/login", validate(loginSchema), authController.loginUser);
authRouter.post("/refresh-token", validate(token), authController.refreshToken)
authRouter.post("/logout", authMiddleware, authController.logout)

authRouter.get("/test", authMiddleware, (req: Request, res: Response) => {
    res.json("success")
})

export default authRouter;