import { Request, Response, Router } from 'express';

import { TypePrismaRepository } from '../repositories/Type/TypePrismaRepository';
import { TypeService } from '../services/TypeService';
import { TypeController } from '../controllers/TypeController';
import { storeTypeValidation } from '../validations/celebrate/Type';
import { byIdValidation } from '../validations/celebrate';

const router: Router = Router();

// controller
const typeRepository = new TypePrismaRepository();
const typeService = new TypeService(typeRepository);
const typeController = new TypeController(typeService);

router.post('/', storeTypeValidation, async (req: Request, res: Response) => {
    await typeController.store(req, res);
});
router.delete('/:id', byIdValidation, async (req: Request, res: Response) => {
    await typeController.destroy(req, res);
});

export { router as typeRoutes };