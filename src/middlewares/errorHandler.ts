import { Request, Response, NextFunction } from 'express';

export function errorHandler( error: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).send('There is a server problem')
}