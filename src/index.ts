import express , { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import companiesRouter from './routes/companiesRouter';
import employeesRouter from './routes/employeesRouter';
import 'express-async-errors';
import { errorHandler } from './middlewares/controllers/errorHandler';


const app = express()
dotenv.config()

app.use(cors())
app.use(json())
app.use(companiesRouter)
app.use(employeesRouter)
app.use(errorHandler)

const PORT: number = Number(process.env.PORT) || 5003

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));