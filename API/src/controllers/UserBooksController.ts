import { Request, Response } from 'express';
import { prisma } from '../app';

type UserBook = {
  id: string;
  author: string;
  title: string;
};

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

export async function updateUserBook(req: Request, res: Response) {
  const { id, status, dateConcluded, score } = req.body;

  const userBook = await prisma.userBook.update({
    data: {
      book: dateConcluded,
      score: score,
      status: status,
      dateConcluded: dateConcluded,
    },
    where: {
      id: id,
    },
  });

  res.status(200).json(userBook);
}

export async function removeBookFromList(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const deletedUserBook = await prisma.userBook.delete({
      where: {
        id: id,
      },
    });

    if (!deletedUserBook) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }

    res.status(200).json('Book deleted from list');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    const userBook = await prisma.userBook.findFirst({
      where: {
        id: req.body.bookId,
      },
    });

    if (!userBook) {
      await prisma.book.delete({
        where: {
          id: req.body.bookId,
        },
      });
    }
  }
}
