import { Request, Response, Router } from 'express';

import { UserPrismaRepository } from '../repositories/User/UserPrismaRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { isAuth } from '../middlewares/isAuth';
import { destroyUserValidation, storeUserValidation } from '../validations/celebrate/User';

const router: Router = Router();

// controller
const userRepository = new UserPrismaRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/', storeUserValidation, async (req: Request, res: Response) => {
    await userController.store(req, res);
});

router.delete('/:id', destroyUserValidation, isAuth, async (req: Request, res: Response) => {
    await userController.destroy(req, res);
});

router.post('/auth', async (req: Request, res: Response) => {
    await userController.auth(req, res);
});

export { router as userRoutes };