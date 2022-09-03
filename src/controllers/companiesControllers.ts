import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/cardRepository';
import { createCard } from '../services/companiesServices';

export async function newCard(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string; 
    const data: { employeeId: number, cardType: TransactionTypes } = req.body;  

    createCard(apiKey, data);
    
    res.status(200).send({message: 'Cartão criado com sucesso pela empresa'});
}

export async function rechargeCard(req: Request, res: Response) {
    res.status(200).send({message: 'estou na rota rechargeCard'});

}