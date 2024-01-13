import { Router } from 'express';
import * as UserBookController from '../controllers/UserBooksController';

export const booksRouter = Router();

booksRouter.use('/add-book', UserBookController.addBookToList);
booksRouter.use('/remove-book', UserBookController.removeBookFromList);
