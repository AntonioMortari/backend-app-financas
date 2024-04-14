import { Request, Response } from 'express';
import { ITypeCreate } from '../interfaces/TypeInterfaces';
import { TypeService } from '../services/TypeService';
import { StatusCodes } from 'http-status-codes';


class TypeController {

    private service: TypeService;

    constructor(service: TypeService) {
        this.service = service;
    }

    public async store(req: Request<{}, {}, ITypeCreate>, res: Response) {
        const { name } = req.body;

        const result = await this.service.create({ name });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;

        await this.service.delete(Number(id));

        return res.status(StatusCodes.NO_CONTENT).send();
    }

}

export { TypeController };