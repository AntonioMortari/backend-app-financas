import { Request, Response, Router } from 'express';

import { TypePrismaRepository } from '../repositories/Type/TypePrismaRepository';
import { RecordPrismaRepository } from '../repositories/Record/RecordPrismaRepository';
import { RecordService } from '../services/RecordService';
import { RecordController } from '../controllers/RecordController';
import { isAuth } from '../middlewares/isAuth';

const router: Router = Router();

// controller
const typeRepository = new TypePrismaRepository();
const recordRepository = new RecordPrismaRepository();
const recordService = new RecordService(recordRepository, typeRepository);
const recordController = new RecordController(recordService);

router.get('/', isAuth, async (req: Request, res: Response) => {
    await recordController.index(req, res);
});

router.post('/', isAuth, async (req: Request, res: Response) => {
    await recordController.store(req, res);
});

router.delete('/:id', isAuth, async (req: Request, res: Response) => {
    await recordController.destroy(req, res);
});

router.put('/:id', isAuth, async (req: Request, res: Response) => {
    await recordController.edit(req, res);
});

export { router as recordRoutes };