import { Request, Response } from 'express';

export async function createCard(req: Request, res: Response) {
    res.status(200).send({message: 'estou na rota createCard'});
}

export async function rechargeCard(req: Request, res: Response) {
    res.status(200).send({message: 'estou na rota rechargeCard'});

}