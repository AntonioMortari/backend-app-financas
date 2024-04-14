import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { IUserCreate } from '../interfaces/UserInterfaces';
import { StatusCodes } from 'http-status-codes';


class UserController {

    private service: UserService;


    constructor(service: UserService) {
        this.service = service;
    }

    public async store(req: Request<{}, {}, IUserCreate>, res: Response) {
        const { name, email, password } = req.body;

        const result = await this.service.create({ name, email, password });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;

        await this.service.delete(Number(id));

        return res.status(StatusCodes.NO_CONTENT).send();
    }

    public async auth(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await this.service.auth(email, password);

        return res.status(StatusCodes.OK).json({ token: result });
    }

}

export { UserController };