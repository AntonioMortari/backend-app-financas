import { Request, Response, Router } from 'express';

import { UserPrismaRepository } from '../repositories/User/UserPrismaRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';

const router: Router = Router();

// controller
const userRepository = new UserPrismaRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/', async (req: Request, res: Response) => {
    await userController.store(req,res);
});

export { router as userRoutes };