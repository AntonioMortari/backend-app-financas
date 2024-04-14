import bcrypt from 'bcrypt';

const SALT = 10;

const hash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT);
};

const compare = async (password: string, encryptPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, encryptPassword);
};

export { compare, hash };