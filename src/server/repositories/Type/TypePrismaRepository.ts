import { Type } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { ITypeCreate, TypeRepository } from '../../interfaces/TypeInterfaces';

class TypePrismaRepository implements TypeRepository {

    public async create({ name }: ITypeCreate): Promise<number> {
        const result = await prisma.type.create({
            data: { name }
        });

        return result.id;
    }

    public async delete(id: number): Promise<void> {
        await prisma.type.delete({ where: { id } })
    }

    public async findByName(name: string): Promise<Type | null> {
        return await prisma.type.findUnique({ where: { name } });
    }

    public async findById(id: number): Promise<Type | null> {
        return await prisma.type.findUnique({ where: { id } });
    }

}

export { TypePrismaRepository };