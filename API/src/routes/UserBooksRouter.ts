import { Router } from 'express';
import * as UserBookController from '../controllers/UserBooksController';

export const booksRouter = Router();

booksRouter.post('/add-book', UserBookController.addBookToList);
booksRouter.delete('/remove-book', UserBookController.removeBookFromList);
booksRouter.put('/update-book', UserBookController.updateBookFromList);
