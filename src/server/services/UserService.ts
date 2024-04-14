import { AppError } from '../errors/AppError';
import { IUserCreate, UserRepository } from '../interfaces/UserInterfaces';
import { StatusCodes } from 'http-status-codes';
import { compare, hash } from '../utils/encryptService';
import { sign } from '../utils/jwtService';

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

    public async delete(id: number) {
        const findUser = await this.repository.findById(id);

        if (!findUser) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        await this.repository.delete(id);
    }

    public async auth(email: string, password: string) {

        const findUser = await this.repository.findByEmail(email);

        if (!findUser) {
            throw new AppError('Email or password incorrects', StatusCodes.BAD_REQUEST);
        }

        if (!await compare(password, findUser.password)) {
            throw new AppError('Email or password incorrects', StatusCodes.BAD_REQUEST);
        }

        const token = sign({ decoded: findUser.id.toString(), expiresIn: '1h' });

        return token;

    }

}

export { UserService };