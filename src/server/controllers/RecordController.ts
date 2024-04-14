import { Request, Response } from 'express';
import { IRecordCreate } from '../interfaces/Record';
import { RecordService } from '../services/RecordService';
import { StatusCodes } from 'http-status-codes';

class RecordController {

    private service: RecordService;

    constructor(service: RecordService) {
        this.service = service;
    }

    public async store(req: Request<{}, {}, IRecordCreate>, res: Response) {
        const { typeId, value } = req.body;
        const userId = Number(req.user_id);

        const result = await this.service.create({
            date: new Date(),
            typeId,
            userId,
            value
        });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async index(req: Request, res: Response){
        const id = req.user_id;

        const result = await this.service.findAll(Number(id));

        return res.status(StatusCodes.OK).json(result);
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;

        await this.service.delete(Number(id));

        return res.status(StatusCodes.NO_CONTENT).send();
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        const { value, typeId, date } = req.body;

        await this.service.update(Number(id), { date, typeId, value });

        return res.status(StatusCodes.NO_CONTENT).send();
    }

}

export { RecordController };