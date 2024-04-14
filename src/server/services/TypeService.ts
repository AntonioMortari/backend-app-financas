import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { ITypeCreate, TypeRepository } from '../interfaces/TypeInterfaces';


class TypeService {

    private repository: TypeRepository;

    constructor(repository: TypeRepository) {
        this.repository = repository;
    }

    public async create({ name }: ITypeCreate) {
        const findType = await this.repository.findByName(name);

        if(findType){
            throw new AppError(`Type with name ${name} exists`, StatusCodes.BAD_REQUEST);
        }

        return await this.repository.create({ name });
    }

    public async delete(id: number){
        const findType = await this.repository.findById(id);

        if(!findType){
            throw new AppError('Type not found', StatusCodes.NOT_FOUND);
        }
    }

}

export { TypeService };