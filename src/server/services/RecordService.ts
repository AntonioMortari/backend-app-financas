import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IRecordCreate, IRecordUpdate, RecordRepository } from '../interfaces/Record';
import { TypeRepository } from '../interfaces/TypeInterfaces';
import { UserRepository } from '../interfaces/UserInterfaces';

class RecordService {

    private repository: RecordRepository;
    private typeRepository: TypeRepository;
    private userRepository: UserRepository;

    constructor(repository: RecordRepository, typeRepository: TypeRepository, userRepository: UserRepository) {
        this.repository = repository;
        this.typeRepository = typeRepository;
        this.userRepository = userRepository;
    }

    public async create({ date, typeId, userId, value }: IRecordCreate) {

        const findType = await this.typeRepository.findById(typeId);

        if (!findType) {
            throw new AppError('Type not found', StatusCodes.NOT_FOUND);
        }

        const findUser = await this.userRepository.findById(userId);

        if (!findUser) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        const result = await this.repository.create({ date, typeId, userId, value });

        if (result.typeId == 1) {
            await this.userRepository.setBalance(userId, Number(findUser.balance) + value);
        }

        if (result.typeId == 2) {
            await this.userRepository.setBalance(userId, Number(findUser.balance) - value);
        }

        return result.id;
    }

    public async findAll(user_id: number) {
        return await this.repository.findAll(user_id);
    }

    public async delete(id: number) {
        const findRecord = await this.repository.findById(id);

        if (!findRecord) {
            throw new AppError('Record not found', StatusCodes.NOT_FOUND);
        }

        await this.repository.delete(id);

        const findUser = await this.userRepository.findById(findRecord.userId);

        if(!findUser){
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        if(findRecord.typeId == 1){
            await this.userRepository.setBalance(findUser.id, Number(findUser.balance) - Number(findRecord.value))
        }

        if(findRecord.typeId == 2){
            await this.userRepository.setBalance(findUser.id, Number(findUser.balance) + Number(findRecord.value))
        }
    }

    public async update(id: number, { date, typeId, value }: IRecordUpdate) {
        const findRecord = await this.repository.findById(id);

        if (!findRecord) {
            throw new AppError('Record not found', StatusCodes.NOT_FOUND);
        }

        const findType = await this.typeRepository.findById(typeId || findRecord.typeId);

        if (!findType) {
            throw new AppError('Type not found', StatusCodes.NOT_FOUND);
        }

        await this.repository.update(id, {
            date: date || findRecord.date,
            typeId: typeId || findRecord.typeId,
            value: value || Number(findRecord.value)
        });

        
    }

}

export { RecordService };