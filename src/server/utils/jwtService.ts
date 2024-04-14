import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';

interface IJwtData {
    decoded: string;
    expiresIn: string;
}

const sign = ({ decoded, expiresIn }: IJwtData): string => {

    const SECRET_JWT = process.env.SECRET_JWT;

    if (!SECRET_JWT) {
        throw new AppError('JWT key is missing', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const token = jwt.sign(decoded, SECRET_JWT, {
        expiresIn,
    });

    return token;
};

const verify = (token: string) => {
    const SECRET_JWT = process.env.SECRET_JWT;

    if (!SECRET_JWT) {
        throw new AppError('JWT key is missing', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    try {
        const decoded = jwt.verify(token, SECRET_JWT);

        if (typeof decoded.sub == 'string') {
            return decoded.sub;
        }

        throw new AppError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
    } catch (error) {
        throw new AppError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
    }
};

export { sign, verify };

