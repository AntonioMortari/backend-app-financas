import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';


const errorMiddleware = (
    error: Error & Partial<AppError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log(error);

    const statusCode = typeof error.getStatusCode == 'function' ? error.getStatusCode() : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = typeof error.getStatusCode == 'function' ? error.message : 'Internal Server Error';

    return res.status(statusCode).json({
        status: statusCode,
        message: message,
        timestamp: new Date(),
        path: req.url
    });

};

export { errorMiddleware };