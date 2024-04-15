import { Request, Response, Router } from 'express';

import { TypePrismaRepository } from '../repositories/Type/TypePrismaRepository';
import { RecordPrismaRepository } from '../repositories/Record/RecordPrismaRepository';
import { UserPrismaRepository } from '../repositories/User/UserPrismaRepository';
import { RecordService } from '../services/RecordService';
import { RecordController } from '../controllers/RecordController';
import { isAuth } from '../middlewares/isAuth';
import { editRecordValidation, storeRecordValidation } from '../validations/celebrate/Record';
import { byIdValidation } from '../validations/celebrate';

const router: Router = Router();

// controller
const typeRepository = new TypePrismaRepository();
const userRepository = new UserPrismaRepository();
const recordRepository = new RecordPrismaRepository();
const recordService = new RecordService(recordRepository, typeRepository, userRepository);
const recordController = new RecordController(recordService);

router.get('/', isAuth, async (req: Request, res: Response) => {
    await recordController.index(req, res);
});

router.post('/', isAuth, storeRecordValidation, async (req: Request, res: Response) => {
    await recordController.store(req, res);
});

router.delete('/:id', isAuth, byIdValidation, async (req: Request, res: Response) => {
    await recordController.destroy(req, res);
});

router.put('/:id', isAuth, byIdValidation, editRecordValidation, async (req: Request, res: Response) => {
    await recordController.edit(req, res);
});

export { router as recordRoutes };