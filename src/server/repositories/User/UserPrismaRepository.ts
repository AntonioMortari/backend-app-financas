import { User } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { IUserCreate, UserRepository } from '../../interfaces/UserInterfaces';

class UserPrismaRepository implements UserRepository {

    public async create({ name, email, password }: IUserCreate): Promise<number> {
        const result = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return result.id;
    }

    public async findById(id: number): Promise<User | null> {
        const result = prisma.user.findUnique({
            where: { id }
        });

        return result;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const result = prisma.user.findUnique({
            where: { email }
        });

        return result;
    }

    public async delete(id: number): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }

}

export { UserPrismaRepository };