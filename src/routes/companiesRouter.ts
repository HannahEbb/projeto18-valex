import { Router } from 'express';
import { newCard, newRecharge } from '../controllers/companiesControllers';

const companiesRouter = Router();

companiesRouter.post('/create-card', newCard) // schema para validar formato dos dados recebidos e controller
companiesRouter.post('/recharge', newRecharge) // schema para validar formato dos dados recebidos e controller

export default companiesRouter;