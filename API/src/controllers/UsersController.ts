import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../app';

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

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.body;
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

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
