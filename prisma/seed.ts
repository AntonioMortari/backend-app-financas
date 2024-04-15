import { prisma } from "../src/server/database/prisma";


const main = async() => {
    const type1 = {
        name: 'Receita'
    };

    const type2 = {
        name: 'Despesa'
    };

    await prisma.type.create({
        data:{
            name: type1.name
        }
    });
    await prisma.type.create({
        data:{
            name: type2.name
        }
    });
};

main();