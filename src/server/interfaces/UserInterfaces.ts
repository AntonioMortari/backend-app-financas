import { User } from '@prisma/client';

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserRepository {
    create: ({ name, email, password }: IUserCreate) => Promise<number>
    findById: (id: number) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    delete: (id: number) => Promise<void>
    setBalance:(userId: number, newBalance: number) => Promise<void>
}