import { Router } from 'express';
import * as employeesController from '../controllers/employeesControllers';

const employeesRouter = Router();

employeesRouter.put('/activate-card', employeesController.newActivation) // schema para validar formato dos dados recebidos e controller
employeesRouter.get('/card-balance/:id', employeesController.newBalanceCheck)
employeesRouter.put('/block-card', employeesController.newCardBlock)
employeesRouter.put('/unblock-card', employeesController.newCardUnblock)
employeesRouter.post('/purchase', employeesController.newCardPurchase)

export default employeesRouter;