import { Record, User } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { IRecordCreate, IRecordUpdate, RecordRepository } from '../../interfaces/Record';


class RecordPrismaRepository implements RecordRepository {

    public async create({ value, date, userId, typeId }: IRecordCreate): Promise<Record> {
        const result = await prisma.record.create({
            data: {
                value,
                date,
                userId,
                typeId
            }
        });

        return result;
    }

    public async findAll(user_id: number): Promise<Record[]> {
        const result = await prisma.record.findMany({ where: { userId: user_id } });

        return result;
    }

    public async findById(id: number): Promise<Record | null> {
        return prisma.record.findUnique({ where: { id } });
    }

    public async delete(id: number): Promise<void> {
        await prisma.record.delete({ where: { id } });
    }

    public async update(id: number, { date, typeId, value }: IRecordUpdate): Promise<void> {
        await prisma.record.update({
            where: { id },
            data: {
                value,
                date,
                typeId
            }
        });
    }

}

export { RecordPrismaRepository };