import { AppError } from '../errors/AppError';
import { IUserCreate, UserRepository } from '../interfaces/UserInterfaces';
import { StatusCodes } from 'http-status-codes';
import { hash } from '../utils/encryptService';

class UserService {

    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async create({ name, email, password }: IUserCreate) {

        const findUser = await this.repository.findByEmail(email);

        if (findUser) {
            throw new AppError(`User with email ${email} exists`, StatusCodes.BAD_REQUEST);
        }

        return await this.repository.create({ name, email, password: await hash(password) });
    }

}

export { UserService };