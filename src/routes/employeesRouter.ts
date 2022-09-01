import { Router } from 'express';

const employeesRouter = Router();

employeesRouter.put('/create-card') // schema para validar formato dos dados recebidos e controller
employeesRouter.post('my-card') // schema para validar formato dos dados recebidos e controller
employeesRouter.get('card-balance:id')
employeesRouter.put('block-card')
employeesRouter.put('unblock-card')
employeesRouter.put('purchase')


export default employeesRouter;