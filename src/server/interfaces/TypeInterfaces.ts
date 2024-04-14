import { Type } from "@prisma/client";

export interface ITypeCreate{
    name: string;
}

export interface TypeRepository{
    create: ({ }: ITypeCreate) => Promise<number>
    delete: (id: number) => Promise<void>
    findByName: (name: string) => Promise<Type | null>
    findById: (id: number) => Promise<Type | null>
}