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

        const result = await this.service.create({ name, email, password});

        return res.status(StatusCodes.CREATED).json(result);
    }

}

export { UserController };