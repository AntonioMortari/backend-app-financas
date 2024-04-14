import { Record } from '@prisma/client';

export interface IRecordCreate {
    value: number;
    date: Date,
    userId: number;
    typeId: number;
}
export interface IRecordUpdate {
    value?: number;
    date?: Date,
    typeId?: number;
}

export interface RecordRepository {
    create: ({ value, date, userId, typeId }: IRecordCreate) => Promise<number>
    findAll: (user_id: number) => Promise<Record[]>
    findById: (id: number) => Promise<Record | null>
    delete: (id: number) => Promise<void>
    update: (id: number, { value, date, typeId }: IRecordUpdate) => Promise<void>
}