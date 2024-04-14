import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IRecordCreate, IRecordUpdate, RecordRepository } from '../interfaces/Record';
import { TypeRepository } from '../interfaces/TypeInterfaces';

class RecordService {

    private repository: RecordRepository;
    private typeRepository: TypeRepository;

    constructor(repository: RecordRepository, typeRepository: TypeRepository) {
        this.repository = repository;
        this.typeRepository = typeRepository;
    }

    public async create({ date, typeId, userId, value }: IRecordCreate) {

        const findType = await this.typeRepository.findById(typeId);

        if(!findType){
            throw new AppError('Type not found', StatusCodes.NOT_FOUND);
        }

        return await this.repository.create({ date, typeId, userId, value })
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
    }

    public async update(id: number, { date, typeId, value }: IRecordUpdate) {
        const findRecord = await this.repository.findById(id);

        if (!findRecord) {
            throw new AppError('Record not found', StatusCodes.NOT_FOUND);
        }

        const findType = await this.typeRepository.findById(typeId || findRecord.typeId);

        if(!findType){
            throw new AppError('Type not found', StatusCodes.NOT_FOUND);
        }

        await this.repository.update(id, {
            date: date || findRecord.date,
            typeId:typeId || findRecord.typeId,
            value: value || Number(findRecord.value)
        });
    }

}

export { RecordService };