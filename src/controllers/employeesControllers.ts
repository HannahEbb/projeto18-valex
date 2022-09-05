import { Request, Response } from 'express';
import * as employeesServices from '../services/employeesServices';

export async function newActivation(req: Request, res: Response) { 
    const { id, yourPassword, securityCode } = req.body;  

    await employeesServices.activateCard( id, securityCode, yourPassword); 
    
    res.status(200).send({message: 'Card activated successfully by the employee.'});
}

export async function newBalanceCheck(req: Request, res: Response) { 
    const id = Number(req.params["id"] as string); 

    const result = await employeesServices.checkCardBalance(id); 
    
    res.status(200).send(result);
}