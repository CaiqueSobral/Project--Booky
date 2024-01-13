import { Router } from 'express';
import { userRouter } from './routes/userRouter';

export const router: Router = Router();

router.use('/user', userRouter);
