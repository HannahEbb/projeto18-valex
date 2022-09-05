import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/cardRepository';
import { createCard, rechargeCard } from '../services/companiesServices';

export async function newCard(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string; 
    const data: { id: number, cardType: TransactionTypes } = req.body;  

    createCard(apiKey, data);
    
    res.status(200).send({message: 'Card created successfully by the company.'});
}

export async function newRecharge(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string; 
    const rechargeData: { cardId: number, amount: number } = req.body;

    rechargeCard(apiKey, rechargeData);

    res.status(200).send({message: 'Card recharged successfully!'});

}