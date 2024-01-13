import { Router } from 'express';
import * as UserController from '../controllers/UsersController';

export const userRouter = Router();

userRouter.post('/register', UserController.createUser);
userRouter.post('/add-book', UserController.addBookToList);
