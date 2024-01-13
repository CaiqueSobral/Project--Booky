import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../app';
import { getBookByTitleAndAuthor } from './BooksController';

type UserBook = {
  id: string;
  author: string;
  title: string;
};

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 15);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function addBookToList(req: Request, res: Response) {
  try {
    const { id, author, title } = req.body as UserBook;

    const book = await prisma.book.findFirst({
      where: {
        title: title,
        author: author,
      },
    });

    if (book) {
      const isBookAdded = await prisma.userBook.findFirst({
        where: {
          AND: {
            bookId: book?.id,
            userId: id,
          },
        },
      });

      if (isBookAdded) {
        res.status(400).json({ error: 'Book already in the list' });
        return;
      }

      const user = await addBookToUserList(id, book.id);
      res.status(200).json(user);
    } else {
      const user = await createBookAndAddToList({
        id,
        author,
        title,
      });
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addBookToUserList(id: string, bookId: string) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      listedBooks: {
        create: {
          bookId: bookId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      listedBooks: true,
    },
  });
}

async function createBookAndAddToList(userBook: UserBook) {
  return await prisma.user.update({
    where: {
      id: userBook.id,
    },
    data: {
      listedBooks: {
        create: {
          book: {
            create: {
              title: userBook.title,
              author: userBook.author,
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      listedBooks: true,
    },
  });
}
