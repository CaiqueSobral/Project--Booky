import { Router } from 'express';
import { userRouter } from './routes/userRouter';
import { booksRouter } from './routes/UserBooksRouter';

export const router: Router = Router();

router.use('/user', userRouter);
router.use('/book', booksRouter);
