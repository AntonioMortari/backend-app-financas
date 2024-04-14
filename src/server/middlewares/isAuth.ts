import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { verify } from '../utils/jwtService';


const isAuth = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', StatusCodes.UNAUTHORIZED);
    }

    const [bearer, token] = authHeader.split(' ');

    if (!bearer) {
        throw new AppError('Bearer token is required', StatusCodes.UNAUTHORIZED);
    }

    const result = verify(token);

    req.user_id = result;

    next();
};

export { isAuth };