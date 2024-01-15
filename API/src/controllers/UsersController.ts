import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../app';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    console.log('passei aqui');
    console.log(name, email, password);

    const hashedPass = await bcrypt.hash(password, 15);

    const userExist = await prisma.user.findFirst({
      select: {
        id: true,
      },
      where: {
        email: email,
      },
    });

    if (userExist) {
      res.status(401).json({ error: 'Email already in use' });
      return;
    }

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

export async function authUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        password: true,
      },
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401).json({ Unauthorized: 'Wrong email or Password' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(401);
      return;
    }

    const userAuthorized = await getUserById(user.id);

    res.status(200).json(userAuthorized);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserById(id: string) {
  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        listedBooks: {
          select: {
            id: true,
            book: {
              select: {
                id: true,
                title: true,
                author: true,
              },
            },
            dateAdded: true,
            status: true,
            dateConcluded: true,
            score: true,
          },
        },
      },
      where: {
        id: id,
      },
    });

    return user;
  } catch (err) {
    throw new Error('Internal Server Error');
  }
}
