'use client';
import { BookCard } from '@/components/BookCard';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserCtx';
import { useRouter } from 'next/navigation';
import { json } from 'stream/consumers';

export default function HomePage() {
  const userContext = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [changing, setChanging] = useState(false);
  const router = useRouter();

  const [book, setBook] = useState('');
  const [author, setAuthor] = useState('');

  const user = userContext.user;

  if (!user) {
    router.back();
  }

  const addBook = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/book/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          title: book,
          author: author,
        }),
      });

      const newUser = await response.json();

      if (newUser.error) {
        setOpenModal(false);
        return;
      }

      user.listedBooks.splice(
        0,
        user.listedBooks.length,
        ...newUser.listedBooks
      );
      setOpenModal(false);
    } catch (err) {
      console.log('Error');
    }
  };

  const deleteBook = async (id: string) => {
    setChanging(true);
    try {
      await fetch('http://localhost:3001/api/book/remove-book', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      user.listedBooks.splice(
        0,
        user.listedBooks.length,
        ...user.listedBooks.filter((item: any) => item.id != id)
      );
      setChanging(false);
    } catch (err) {
      console.log('Error');
    }
  };

  const updateBook = async (
    id: string,
    status: string,
    dateConcluded: Date | null,
    score: number | null
  ) => {
    setChanging(true);
    try {
      const response = await fetch(
        'http://localhost:3001/api/book/update-book',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            id: id,
            status: status,
            dateConcluded: dateConcluded,
            score: score,
          }),
        }
      );

      const newUser = await response.json();

      user.listedBooks.splice(
        0,
        user.listedBooks.length,
        ...newUser.listedBooks
      );
      setChanging(false);
    } catch (err) {
      console.log('Error');
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 flex flex-col items-center justify-center gap-8">
        <button
          onClick={() => setOpenModal(true)}
          className="mt-4 px-4 py-1 bg-purple-700 text-purple-100 rounded-xl"
        >
          Adicionar Livro
        </button>

        {openModal && (
          <div className="relative flex items-center justify-center">
            <span
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-4 font-semibold text-purple-100 text-lg"
            >
              X
            </span>
            <div className="w-[500px] h-[250px] bg-purple-700 flex items-center justify-center rounded-xl shadow-2xl flex-col gap-4">
              <div className="flex gap-2 flex-col">
                <label className="text-purple-100 font-semibold">Livro: </label>
                <input
                  onChange={(item) => setBook(item.target.value)}
                  type="text"
                  className="text-purple-700 px-4 rounded-full font-semibold"
                ></input>
              </div>
              <div className="flex gap-2 flex-col">
                <label className="text-purple-100 font-semibold">Autor: </label>
                <input
                  onChange={(item) => setAuthor(item.target.value)}
                  type="text"
                  className="text-purple-700 px-4 rounded-full font-semibold"
                ></input>
              </div>

              <button
                onClick={() => addBook()}
                className="bg-purple-400 text-purple-100 px-8 py-1 rounded-xl mt-4 font-semibold"
              >
                Adicionar
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative w-full min-h-max flex items-center justify-start flex-col gap-16 my-8">
        {user &&
          user.listedBooks.map((item: any, i: any) => {
            return (
              <BookCard
                key={i}
                listedBook={item}
                deleteBook={deleteBook}
                updateBook={updateBook}
              />
            );
          })}
      </main>
    </>
  );
}
