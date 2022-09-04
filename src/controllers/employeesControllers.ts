import { Request, Response } from 'express';
import * as employeesServices from '../services/employeesServices';

export async function newActivation(req: Request, res: Response) { 
    const { id, yourPassword, securityCode } = req.body;  

    employeesServices.activateCard( id, securityCode, yourPassword); // cardData = { password: 'ahoiahi'}
    
    res.status(200).send({message: 'Card activated successfully by the employee.'});
}