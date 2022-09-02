import { Router } from 'express';
import { createCard, rechargeCard } from '../controllers/companiesControllers';

const companiesRouter = Router();

companiesRouter.post('/create-card', createCard) // schema para validar formato dos dados recebidos e controller
companiesRouter.post('/recharge/:id', rechargeCard) // schema para validar formato dos dados recebidos e controller

export default companiesRouter;