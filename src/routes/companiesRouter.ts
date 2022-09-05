import { Router } from 'express';
import { newCard, newRecharge } from '../controllers/companiesControllers';

const companiesRouter = Router();

companiesRouter.post('/create-card', newCard) 
companiesRouter.post('/recharge', newRecharge) 

export default companiesRouter;